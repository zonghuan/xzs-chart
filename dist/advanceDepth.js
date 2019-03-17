/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ({

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _source = __webpack_require__(13);

// import "./depth.css";

var create3DContext = function create3DContext(canvas, opt_attr) {
    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var context = null;
    for (var i = 0; i < names.length; i++) {
        try {
            context = canvas.getContext(names[i], opt_attr);
        } catch (e) {}
        if (context) {
            break;
        }
    }
    return context;
};
var loadShader = function loadShader(gl, type, source) {
    var shader = gl.createShader(type);
    if (shader === null) {
        console.log('unable to create shader');
        return;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var complied = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!complied) {
        var error = gl.getShaderInfoLog(shader);
        console.log(error);
        return null;
    }
    return shader;
};

var canvas = document.createElement('canvas');

canvas.width = 1920;
canvas.height = 1080;

canvas.style.width = "1920px";
canvas.style.height = "1080px";
canvas.style.boxShadow = '0 0 5px rgba(0,0,0,.2)';

document.body.appendChild(canvas);

canvas.addEventListener('webglcontextcreationerror', function (e) {
    console.log('webgl context create error');
}, false);

var gl = create3DContext(canvas, { antialias: true });
var vertexShader = loadShader(gl, gl.VERTEX_SHADER, _source.vshader);
var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, _source.fshader);

if (!vertexShader || !fragmentShader) {
    throw Error('shader create error');
}
var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

var vertices = new Float32Array([-1.0, 1.0, -1.0, 0.0, 1.0, -1.0, -1.0, -1.0, 0.0, 0.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 0.0]);

var screenProgram = gl.createProgram();
var screenFragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, _source.screenFshader);
gl.attachShader(screenProgram, vertexShader);
gl.attachShader(screenProgram, screenFragmentShader);

var loadImages = function loadImages(images) {
    var index = 0;
    return new Promise(function (resolve, reject) {
        var list = [];
        for (var i = 0; i < images.length; i++) {
            var image = new Image();
            image.crossOrigin = '*';
            image.src = images[i];
            list.push(image);
            image.onload = function () {
                index++;
                if (index === images.length) {
                    resolve(list);
                }
            };
        }
    });
};

var createFrameBuffer = function createFrameBuffer(gl) {
    var framebuffer = gl.createFramebuffer();
    // 新建纹理对象作为帧缓冲区的颜色缓冲区对象
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1920, 1080, 0, gl.RGB, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // 新建渲染缓冲区对象作为帧缓冲区的深度缓冲区对象
    var depthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, 1920, 1080);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
    // 检测帧缓冲区对象的配置状态是否成功
    var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if (gl.FRAMEBUFFER_COMPLETE !== e) {
        console.log('Frame buffer object is incomplete: ' + e.toString());
        return;
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    return texture;
};

var drawToBuffer = function drawToBuffer(list, focalNum) {

    gl.linkProgram(program);
    gl.useProgram(program);

    // 绑定framebuffer
    var frameTexture = createFrameBuffer(gl);

    var FSIZE = vertices.BYTES_PER_ELEMENT;

    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(program, 'a_Position');
    var a_TexCoord = gl.getAttribLocation(program, 'a_TexCoord');

    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 5 * FSIZE, 0);
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, 5 * FSIZE, 3 * FSIZE);

    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_TexCoord);

    gl.clearColor(1.0, 1.0, 1.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    var colorPng = list[0];

    var colorTexture = gl.createTexture();
    var u_ColorSampler = gl.getUniformLocation(program, 'u_ColorSampler');
    var imageWidth = gl.getUniformLocation(program, 'imageWidth');
    var imageHeight = gl.getUniformLocation(program, 'imageHeight');
    var focal = gl.getUniformLocation(program, 'focal');

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
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return frameTexture;
};

var drawToScreen = function drawToScreen(colorTexture, focalNum) {
    gl.linkProgram(screenProgram);
    gl.useProgram(screenProgram);

    var FSIZE = vertices.BYTES_PER_ELEMENT;

    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(screenProgram, 'a_Position');
    var a_TexCoord = gl.getAttribLocation(screenProgram, 'a_TexCoord');

    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 5 * FSIZE, 0);
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, 5 * FSIZE, 3 * FSIZE);

    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_TexCoord);

    var u_ColorSampler = gl.getUniformLocation(screenProgram, 'u_ColorSampler');
    var imageWidth = gl.getUniformLocation(screenProgram, 'imageWidth');
    var imageHeight = gl.getUniformLocation(screenProgram, 'imageHeight');
    var focal = gl.getUniformLocation(screenProgram, 'focal');

    gl.clearColor(1.0, 1.0, 1.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, colorTexture);

    gl.uniform1i(u_ColorSampler, 0);
    gl.uniform1f(imageWidth, canvas.width);
    gl.uniform1f(imageHeight, canvas.height);
    gl.uniform1f(focal, focalNum);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

var promise = loadImages(['https://qhyxpicoss.kujiale.com/r/2019/01/15/L3D186S8ENDIERKWDAUI5MI2POH3P3WK888_1920x1080.jpg']);
promise.then(function (list) {

    var wrap = document.createElement('div');
    wrap.innerHTML = "\n        <div class=\"wrap\">\n            <div class=\"line\">\n                <span>\u6A21\u7CCA\u76F4\u5F84 :</span> <input type=\"range\" id=\"focal\" min=\"1\" max=\"200\" value=\"1\" step=\"1\"/><span id=\"focalShow\"></span>\n            </div>\n        </div>\n    ";
    document.body.appendChild(wrap);

    wrap.className = 'wrap';
    wrap.style.position = 'absolute';
    wrap.style.right = 0;
    wrap.style.top = 0;
    wrap.style.width = '300px';
    wrap.style.backgroundColor = '#eee';
    wrap.style.boxShadow = '-2px -2px 2px rgba(0,0,0,.1)';
    wrap.style.padding = '20px 20px';

    var changeCall = function changeCall(e) {
        var focal = document.getElementById('focal');
        document.getElementById('focalShow').innerHTML = focal.value;

        var texture = drawToBuffer(list, parseFloat(focal.value));

        drawToScreen(texture, parseFloat(focal.value));
    };
    document.getElementById('focal').addEventListener('change', changeCall);

    changeCall();
}, function (error) {
    console.log(error);
});

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var vshader = exports.vshader = "\n    attribute vec4 a_Position;\n    attribute vec2 a_TexCoord;\n\n    varying vec2 v_TexCoord;\n\n    void main(){\n        gl_Position = a_Position;\n        v_TexCoord = a_TexCoord;\n    }\n\n";

var fshader = exports.fshader = "\n    precision highp float;\n\n    uniform sampler2D u_ColorSampler;\n\n    uniform float imageWidth;\n    uniform float imageHeight;\n    uniform float focal;\n\n    varying vec2 v_TexCoord;\n\n    vec4 blurLine(int diameter,sampler2D sampler,float width,float height){\n        const float PI = 3.14159265;\n        const int maxBlur = 200;\n\n        if(mod(float(diameter), 2.0) == 0.0){\n            diameter++;\n        }\n        if(diameter > maxBlur){\n            diameter = maxBlur;\n        }\n        int center = (diameter - 1) / 2;\n\n        float sita = pow(float(diameter) / 6.0, 2.0);\n        float radio = sqrt(0.5 / PI / sita);\n        float sum = 0.0;\n        vec4 sumVec4 = vec4(0.0);\n\n        for(int i = 0; i < maxBlur; i++) if(i<center + 1){\n\n            float weight =  radio * exp(-pow(float(i), 2.0) / sita / 2.0);\n\n            float ii = float(i);\n\n            if(i == 0){\n                vec4 color = texture2D(sampler, v_TexCoord);\n                sumVec4 += color * weight;\n                sum += weight;\n            }else{\n                vec4 left = texture2D(sampler, vec2( v_TexCoord.x - ii/width, v_TexCoord.y));\n                vec4 right = texture2D(sampler, vec2( v_TexCoord.x + ii/width, v_TexCoord.y));\n                sumVec4 += left * weight;\n                sumVec4 += right * weight;\n                sum += 2.0 * weight;\n            }\n\n        }\n        return vec4(sumVec4.r/sum, sumVec4.g/sum, sumVec4.b/sum, sumVec4.a/sum);\n    }\n\n    void main(){\n\n        gl_FragColor = blurLine(int(focal), u_ColorSampler, imageWidth, imageHeight);\n\n    }\n";

var screenFshader = exports.screenFshader = "\n     precision highp float;\n\n     uniform sampler2D u_ColorSampler;\n\n     uniform float imageWidth;\n     uniform float imageHeight;\n     uniform float focal;\n\n     varying vec2 v_TexCoord;\n\n     vec4 blurLine(int diameter,sampler2D sampler,float width,float height){\n         const float PI = 3.14159265;\n         const int maxBlur = 200;\n\n         if(mod(float(diameter), 2.0) == 0.0){\n             diameter++;\n         }\n         if(diameter > maxBlur){\n             diameter = maxBlur;\n         }\n         int center = (diameter - 1) / 2;\n\n         float sita = pow(float(diameter) / 6.0, 2.0);\n         float radio = sqrt(0.5 / PI / sita);\n         float sum = 0.0;\n         vec4 sumVec4 = vec4(0.0);\n\n         for(int i = 0; i < maxBlur; i++) if(i<center + 1){\n\n             float weight =  radio * exp(-pow(float(i), 2.0) / sita / 2.0);\n\n             float ii = float(i);\n\n             if(i == 0){\n                 vec4 color = texture2D(sampler, v_TexCoord);\n                 sumVec4 += color * weight;\n                 sum += weight;\n             }else{\n                 vec4 left = texture2D(sampler, vec2( v_TexCoord.x, v_TexCoord.y - ii/height));\n                 vec4 right = texture2D(sampler, vec2( v_TexCoord.x, v_TexCoord.y + ii/height));\n                 sumVec4 += left * weight;\n                 sumVec4 += right * weight;\n                 sum += 2.0 * weight;\n             }\n\n         }\n         return vec4(sumVec4.r/sum, sumVec4.g/sum, sumVec4.b/sum, sumVec4.a/sum);\n     }\n\n     void main(){\n\n         gl_FragColor = blurLine(int(focal), u_ColorSampler, imageWidth, imageHeight);\n\n     }\n";

/***/ })

/******/ });