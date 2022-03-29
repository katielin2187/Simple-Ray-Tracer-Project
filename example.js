var gl;
var program1;
var program2;
var program3;

//cube map
let cubeMap;
var red = new Uint8Array([255, 0, 0, 255]);
var green = new Uint8Array([0, 255, 0, 255]);
var blue = new Uint8Array([0, 0, 255, 255]);
var cyan = new Uint8Array([0, 255, 255, 255]);
var magenta = new Uint8Array([255, 0, 255, 255]);
var yellow = new Uint8Array([255, 255, 0, 255]);


function main()
{
    // Retrieve <canvas> element
    var canvas = document.getElementById('webgl');

    // Get the rendering context for WebGL
    gl = WebGLUtils.setupWebGL(canvas, undefined);
    if (!gl)
    {
        console.log('Failed to get the rendering context for WebGL');
        return;
    }

    //initiate shaders 3
    program3 = initShaders(gl, "vshader3", "fshader3");
    gl.useProgram(program3);

    //initiate shaders 2
    program2 = initShaders(gl, "vshader2", "fshader2");
    gl.useProgram(program2);

    //initiate shaders 1
    program1 = initShaders(gl, "vshader1", "fshader1");
    gl.useProgram(program1);    //first run --> use image 1

    gl.viewport( 0, 0, canvas.width, canvas.height );

    //first draw would be image 1
    //image1();
    //image2();
    image3();

    //event listeners
    document.getElementById("image1").onclick = function () {
        image1();
    };

    document.getElementById("image2").onclick = function () {
        image2();
    };

    document.getElementById("image3").onclick = function () {
        image3();
    };


}

function image1(){

    gl.useProgram(program1);

    // Set clear color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var buffer = gl.createBuffer();

    // Create a square as a strip of two triangles.
    //make square that fits perfectly, defining isn't world geometry,
    // gives ray casting example something to render on
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1,1,
            0,1,
            1,0,
            -1,-1,
            0,1,
            -1,0]),
        gl.STATIC_DRAW
    );

    gl.aPosition = gl.getAttribLocation(program1, "aPosition");
    gl.enableVertexAttribArray(gl.aPosition);
    gl.vertexAttribPointer(gl.aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

}


/**
 * four spheres, need to consider number of times the reflection is called
 */
function image2(){

    gl.useProgram(program2);

    // Set clear color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var buffer = gl.createBuffer();

    // Create a square as a strip of two triangles.
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1,1,
            0,1,
            1,0,
            -1,-1,
            0,1,
            -1,0]),
        gl.STATIC_DRAW
    );

    gl.aPosition = gl.getAttribLocation(program2, "aPosition");
    gl.enableVertexAttribArray(gl.aPosition);
    gl.vertexAttribPointer(gl.aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

}

/**
 * two spheres, one has refraction
 */
function image3(){

    gl.useProgram(program3);

    // Set clear color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var buffer = gl.createBuffer();

    // Create a square as a strip of two triangles.
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            -1,1,
            0,1,
            1,0,
            -1,-1,
            0,1,
            -1,0]),
        gl.STATIC_DRAW
    );


    gl.aPosition = gl.getAttribLocation(program3, "aPosition");
    gl.enableVertexAttribArray(gl.aPosition);
    gl.vertexAttribPointer(gl.aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

}
