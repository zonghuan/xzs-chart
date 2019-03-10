import {vshader, fshader} from './source.js';
// import "./depth.css";

const create3DContext = (canvas, opt_attr) => {
    let names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    let context = null;
    for(var i=0;i<names.length;i++){
        try{
            context = canvas.getContext(names[i],opt_attr)
        }catch(e){}
        if(context){
            break;
        }
    }
    return context;
}
const loadShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    if(shader === null){
        console.log('unable to create shader');
        return;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    let complied = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if(!complied){
        let error = gl.getShaderInfoLog(shader);
        console.log(error);
        return null;
    }
    return shader;
}


const canvas = document.createElement('canvas');

canvas.width = 960;
canvas.height = 500;

canvas.style.width = `960px`;
canvas.style.height = `540px`;
canvas.style.boxShadow = '0 0 5px rgba(0,0,0,.2)';

document.body.appendChild(canvas);

canvas.addEventListener('webglcontextcreationerror', e => {
    console.log('webgl context create error');
}, false);

const gl = create3DContext(canvas, { antialias: true });
const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);

if(!vertexShader || !fragmentShader){
    throw Error('shader create error');
}
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);
gl.useProgram(program);

const vertices = new Float32Array([
    -1.0, 1.0, -1.0, 0.0, 1.0,
    -1.0, -1.0, -1.0, 0.0, 0.0,
    1.0, 1.0, -1.0, 1.0, 1.0,
    1.0, -1.0, -1.0, 1.0, 0.0
]);


const FSIZE = vertices.BYTES_PER_ELEMENT;

const vertexBufferObject = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const a_Position = gl.getAttribLocation(program, 'a_Position');
const a_TexCoord = gl.getAttribLocation(program, 'a_TexCoord');

gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 5 * FSIZE, 0);
gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, 5 * FSIZE, 3 * FSIZE);

gl.enableVertexAttribArray(a_Position);
gl.enableVertexAttribArray(a_TexCoord);

gl.clearColor(1.0, 1.0, 1.0, 0.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

const loadImages = function(images){
    let index = 0;
    return new Promise((resolve, reject) => {
        let list = [];
        for(let i=0;i<images.length;i++){
            let image = new Image();
            image.crossOrigin = '*';
            image.src = images[i];
            list.push(image);
            image.onload = () => {
                index++;
                if(index === images.length){
                    resolve(list);
                }
            };
        }
    });
}


const draw = (list, focalNum = 417.0) => {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    const colorPng = list[0];

    const colorTexture = gl.createTexture();
    const u_ColorSampler = gl.getUniformLocation(program, 'u_ColorSampler');
    const imageWidth = gl.getUniformLocation(program, 'imageWidth');
    const imageHeight = gl.getUniformLocation(program, 'imageHeight');
    const focal = gl.getUniformLocation(program, 'focal');

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, colorTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, colorPng);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.uniform1i(u_ColorSampler, 0);
    gl.uniform1f(imageWidth, colorPng.width);
    gl.uniform1f(imageHeight, colorPng.height);
    gl.uniform1f(focal, focalNum);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);


    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

}

let promise = loadImages(['https://qhyxpicoss.kujiale.com/r/2019/01/15/L3D186S8ENDIERKWDAUI5MI2POH3P3WK888_1920x1080.jpg']);
promise.then(list => {

    let wrap = document.createElement('div');
    wrap.innerHTML = `
        <div class="wrap">
            <div class="line">
                <span>模糊直径 :</span> <input type="range" id="focal" min="1" max="100" value="1" step="1"/><span id="focalShow"></span>
            </div>
        </div>
    `;
    document.body.appendChild(wrap);

    wrap.className = 'wrap';
    wrap.style.position = 'absolute';
    wrap.style.right = 0;
    wrap.style.top = 0;
    wrap.style.width = '300px';
    wrap.style.backgroundColor = '#eee';
    wrap.style.boxShadow = '-2px -2px 2px rgba(0,0,0,.1)';
    wrap.style.padding = '20px 20px';

    const changeCall = (e) => {
        const focal = document.getElementById('focal');
        document.getElementById('focalShow').innerHTML = focal.value;

        draw(list, parseFloat(focal.value));

    };
    document.getElementById('focal').addEventListener('change',changeCall);

    changeCall();

}, (error)=>{
    console.log(error);
});
