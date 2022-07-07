const {exec} = require("child_process");
var fs = require('fs');
var path = require('path');
const tsconfig = require("./tsconfig.json");

function copyFileSync( source, target ) {

    var targetFile = target;

    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, target ) {
    var files = [];

    var targetFolder = path.join( target, path.basename( source ) );
    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            var curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, targetFolder );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}
exec('tsc', (error, stdout, stderr)=>{
    if(error){
        console.error(error);
    }else{
        try{
            const srcDir = path.resolve(__dirname, 'src/worker');
            const destDir = path.resolve(__dirname, path.basename(tsconfig.compilerOptions.outDir));
            copyFolderRecursiveSync(srcDir, destDir);
            console.log("执行成功！");
        }catch(e){
            console.error(e);
        }
    }
})