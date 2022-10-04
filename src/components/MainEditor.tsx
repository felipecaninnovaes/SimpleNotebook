import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Menubar from "./Menubar";
import { writeTextFile, BaseDirectory, readTextFile, createDir} from '@tauri-apps/api/fs';
import { appDir } from '@tauri-apps/api/path';


async function CreateDir(){
  const localStorageInfo = localStorage.getItem('info')
  if (localStorageInfo !== 'true') {
    createDir('log',{dir: BaseDirectory.App, recursive: true})
    await writeTextFile('example_file.txt', '', { dir: BaseDirectory.App});
  }
  let info = localStorage.setItem('info', 'true')
}

CreateDir()
const appDirPath =  await appDir();;
const filePath = `${appDirPath}example_file.txt`;
const database = await readTextFile(filePath)

export default function MainEditor(): JSX.Element {

async function Save(){
    var Element = document.getElementById("content");
    const someElement: HTMLElement = Element as HTMLElement;
    var someElementToString;
    
    if (someElement.outerHTML)
        someElementToString = someElement.outerHTML;
    else if (XMLSerializer)
        someElementToString = new XMLSerializer().serializeToString(someElement);
    someElementToString = String(someElementToString)
  await writeTextFile('example_file.txt', someElementToString, { dir: BaseDirectory.App });
  }
  
  
  const editor = useEditor({
      extensions: [StarterKit],
      // content: 
      content: database
    })
    return <>
      {editor ? <Menubar editor={editor} /> : null}
      <EditorContent id="content" editor={editor} />
      <button onClick={Save} id="button-geturl">Save</button>
    </>
}






