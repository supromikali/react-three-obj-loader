import React, {useEffect, useRef, useState} from "react";
import { createRoot } from 'react-dom/client'
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";

const style = {
    height: 500 // we can control scene size by setting container dimensions
};

const App = props => {
    const thisRef = useRef({});
    const mountRef = useRef(null);

    useEffect(() => {
        thisRef.current.sceneSetup();
        thisRef.current.addLights();
        thisRef.current.loadTheModel();
        thisRef.current.startAnimationLoop();
        window.addEventListener('resize', thisRef.current.handleWindowResize);
        return () => {
            window.removeEventListener('resize', thisRef.current.handleWindowResize);
            window.cancelAnimationFrame(thisRef.current.requestID);
            thisRef.current.controls.dispose();
        }
    }, []);


    // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
    // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
    thisRef.current.sceneSetup = () => {
        // get container dimensions and use them for scene sizing
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        thisRef.current.scene = new THREE.Scene();
        thisRef.current.camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
        );
        thisRef.current.camera.position.z = 500; // is used here to set some distance from a cube that is located at z = 0
        // OrbitControls allow a camera to orbit around the object
        // https://threejs.org/docs/#examples/controls/OrbitControls
        thisRef.current.controls = new OrbitControls( thisRef.current.camera, mountRef.current );
        thisRef.current.renderer = new THREE.WebGLRenderer();
        thisRef.current.renderer.setSize( width, height );
        mountRef.current.appendChild( thisRef.current.renderer.domElement ); // mount using React ref
    };

    // Code below is taken from Three.js OBJ Loader example
    // https://threejs.org/docs/#examples/en/loaders/OBJLoader
    thisRef.current.loadTheModel = () => {
        // instantiate a loader
        const loader = new OBJLoader();

        // load a resource
        loader.load(
            // resource URL relative to the /public/index.html of the app
            'eleph.obj',
            // called when resource is loaded
            ( object ) => {
                thisRef.current.scene.add( object );

                // get the newly added object by name specified in the OBJ model (that is Elephant_4 in my case)
                // you can always set console.log(this.scene) and check its children to know the name of a model
                const el = thisRef.current.scene.getObjectByName("Elephant_4");

                // change some custom props of the element: placement, color, rotation, anything that should be
                // done once the model was loaded and ready for display
                el.material.color.set(0x50C878);
                el.rotation.x = 23.5;

                // centering the model
                // THREE.Box3() is AABB (axis-aligned bounding box). You can set it from the object you've loaded.
                // Then use .getCenter() method to get its center. Then simply subtract the vector of the center
                // from the default position of the object. https://threejs.org/docs/index.html#api/en/math/Box3
                const box = new THREE.Box3().setFromObject( el );
                const center = new THREE.Vector3();
                box.getCenter( center );
                el.position.sub( center );

                // make this element available inside of the whole component to do any animation later
                thisRef.current.model = el;
            },
            // called when loading is in progresses
            ( xhr ) => {

                const loadingPercentage = Math.ceil(xhr.loaded / xhr.total * 100);
                console.log( ( loadingPercentage ) + '% loaded' );

                // update parent react component to display loading percentage
                props.onProgress(loadingPercentage);
            },
            // called when loading has errors
            ( error ) => {

                console.log( 'An error happened:' + error );

            }
        );
    };

    // adding some lights to the scene
    thisRef.current.addLights = () => {
        const lights = [];

        // set color and intensity of lights
        lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        // place some lights around the scene for best looks and feel
        lights[ 0 ].position.set( 0, 2000, 0 );
        lights[ 1 ].position.set( 1000, 2000, 1000 );
        lights[ 2 ].position.set( - 1000, - 2000, - 1000 );

        thisRef.current.scene.add( lights[ 0 ] );
        thisRef.current.scene.add( lights[ 1 ] );
        thisRef.current.scene.add( lights[ 2 ] );
    };

    thisRef.current.startAnimationLoop = () => {
        // slowly rotate an object
        if (thisRef.current.model) thisRef.current.model.rotation.z += 0.005;

        thisRef.current.renderer.render( thisRef.current.scene, thisRef.current.camera );

        // The window.requestAnimationFrame() method tells the browser that you wish to perform
        // an animation and requests that the browser call a specified function
        // to update an animation before the next repaint
        thisRef.current.requestID = window.requestAnimationFrame(thisRef.current.startAnimationLoop);
    };

    thisRef.current.handleWindowResize = () => {
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        thisRef.current.renderer.setSize( width, height );
        thisRef.current.camera.aspect = width / height;

        // Note that after making changes to most of camera properties you have to call
        // .updateProjectionMatrix for the changes to take effect.
        thisRef.current.camera.updateProjectionMatrix();
    };

    return <div style={style} ref={mountRef} />;
}

const Container = () => {
    const [state, setState] = useState({ isMounted: true });

    const {isMounted = true, loadingPercentage = 0} = state;
    return (
        <>
            <button onClick={() => setState(state => ({ ...state, isMounted: !state.isMounted}))}>
                {isMounted ? "Unmount" : "Mount"}
            </button>
            {isMounted && <App onProgress={loadingPercentage => setState(state => ({ ...state, loadingPercentage }))} />}
            {isMounted && loadingPercentage === 100 && <div>Scroll to zoom, drag to rotate</div>}
            {isMounted && loadingPercentage !== 100 && <div>Loading Model: {loadingPercentage}%</div>}
        </>
    )
}

createRoot(document.getElementById('root')).render(
    <Container />
);