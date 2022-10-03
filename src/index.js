const express = require('express');
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);
const app = express();
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));

const EXTENCAO_SAIDA = '.pdf';
app.get("/convert", async (request, response)=>{
    try{
        const { docBuf } = request.body;
        let pdfBuf = await convertDocToPdf(new Uint8Array(docBuf), EXTENCAO_SAIDA, undefined);
        return response.status(200).json({pdfBuf});
    }catch(e){
        return response.status(500).json(e);
    }
})

async function convertDocToPdf(docBuf, EXTENCAO_SAIDA, filter){
    return await libre.convertAsync(docBuf, EXTENCAO_SAIDA, filter);
}

app.listen(8080,()=>{
    console.log("Running");
});