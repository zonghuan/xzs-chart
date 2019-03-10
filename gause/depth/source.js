export const vshader = `
    attribute vec4 a_Position;
    attribute vec2 a_TexCoord;

    varying vec2 v_TexCoord;

    void main(){
        gl_Position = a_Position;
        v_TexCoord = a_TexCoord;
    }

`;


export const fshader = `
    precision highp float;

    uniform sampler2D u_ColorSampler;

    uniform float imageWidth;
    uniform float imageHeight;
    uniform float focal;

    varying vec2 v_TexCoord;

    vec4 blur(int diameter,sampler2D sampler,float width,float height){
        const float PI = 3.14159265;
        const int maxBlur = 100;

        if(mod(float(diameter), 2.0) == 0.0){
            diameter++;
        }
        if(diameter > maxBlur){
            diameter = maxBlur;
        }
        int center = (diameter - 1) / 2;

        float sita = pow(float(diameter) / 6.0, 2.0);
        float sum = 0.0;
        vec4 sumVec4 = vec4(0.0);

        for(int i = 0; i < maxBlur; i++) if(i<diameter){

            for(int j = 0; j < maxBlur; j++) if(j<diameter){
                float x = float(i-center);
                float y = float(j-center);

                float weight = 0.5 / PI / sita * exp(-(pow(x, 2.0) + pow(y, 2.0)) / sita / 2.0);
                sum += weight;
                vec4 v = texture2D(sampler, vec2( v_TexCoord.x + x/width, v_TexCoord.y + y/height ));
                sumVec4 += v * weight;
            }
        }
        return vec4(sumVec4.r/sum, sumVec4.g/sum, sumVec4.b/sum, sumVec4.a/sum);
    }

    void main(){


        gl_FragColor = blur(int(focal), u_ColorSampler, imageWidth, imageHeight);

    }
`;
