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

    vec4 blurLine(int diameter,sampler2D sampler,float width,float height){
        const float PI = 3.14159265;
        const int maxBlur = 200;

        if(mod(float(diameter), 2.0) == 0.0){
            diameter++;
        }
        if(diameter > maxBlur){
            diameter = maxBlur;
        }
        int center = (diameter - 1) / 2;

        float sita = pow(float(diameter) / 6.0, 2.0);
        float radio = sqrt(0.5 / PI / sita);
        float sum = 0.0;
        vec4 sumVec4 = vec4(0.0);

        for(int i = 0; i < maxBlur; i++) if(i<center + 1){

            float weight =  radio * exp(-pow(float(i), 2.0) / sita / 2.0);

            float ii = float(i);

            if(i == 0){
                vec4 color = texture2D(sampler, v_TexCoord);
                sumVec4 += color * weight;
                sum += weight;
            }else{
                vec4 left = texture2D(sampler, vec2( v_TexCoord.x - ii/width, v_TexCoord.y));
                vec4 right = texture2D(sampler, vec2( v_TexCoord.x + ii/width, v_TexCoord.y));
                sumVec4 += left * weight;
                sumVec4 += right * weight;
                sum += 2.0 * weight;
            }

        }
        return vec4(sumVec4.r/sum, sumVec4.g/sum, sumVec4.b/sum, sumVec4.a/sum);
    }

    void main(){

        gl_FragColor = blurLine(int(focal), u_ColorSampler, imageWidth, imageHeight);

    }
`;

 export const screenFshader = `
     precision highp float;

     uniform sampler2D u_ColorSampler;

     uniform float imageWidth;
     uniform float imageHeight;
     uniform float focal;

     varying vec2 v_TexCoord;

     vec4 blurLine(int diameter,sampler2D sampler,float width,float height){
         const float PI = 3.14159265;
         const int maxBlur = 200;

         if(mod(float(diameter), 2.0) == 0.0){
             diameter++;
         }
         if(diameter > maxBlur){
             diameter = maxBlur;
         }
         int center = (diameter - 1) / 2;

         float sita = pow(float(diameter) / 6.0, 2.0);
         float radio = sqrt(0.5 / PI / sita);
         float sum = 0.0;
         vec4 sumVec4 = vec4(0.0);

         for(int i = 0; i < maxBlur; i++) if(i<center + 1){

             float weight =  radio * exp(-pow(float(i), 2.0) / sita / 2.0);

             float ii = float(i);

             if(i == 0){
                 vec4 color = texture2D(sampler, v_TexCoord);
                 sumVec4 += color * weight;
                 sum += weight;
             }else{
                 vec4 left = texture2D(sampler, vec2( v_TexCoord.x, v_TexCoord.y - ii/height));
                 vec4 right = texture2D(sampler, vec2( v_TexCoord.x, v_TexCoord.y + ii/height));
                 sumVec4 += left * weight;
                 sumVec4 += right * weight;
                 sum += 2.0 * weight;
             }

         }
         return vec4(sumVec4.r/sum, sumVec4.g/sum, sumVec4.b/sum, sumVec4.a/sum);
     }

     void main(){

         gl_FragColor = blurLine(int(focal), u_ColorSampler, imageWidth, imageHeight);

     }
`;
