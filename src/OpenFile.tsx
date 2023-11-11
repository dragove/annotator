import { createSignal } from "solid-js";
import { open } from "@tauri-apps/api/dialog"
import { readTextFile } from '@tauri-apps/api/fs'

function OpenFile() {

    const [path, setPath] = createSignal('wait')
    const loadJson = async () => {
        const contents = await readTextFile(path())
    }
    const choosePath = async () => {
        const result = await open()
        if (result !== null) {
            if (typeof result === 'string') {
                setPath(result)
            } else {
                setPath(result[0])
            }
        }
    }
    return (
        <div class="container">
            <div class="inline-flex text-center">
                <button onClick={choosePath} tabindex="-1">选择文件</button>
                <p class="text-sky-600 text-lg">当前选择文件：{path()}</p>
                <button tabindex="-1" onClick={loadJson}>加载文件</button>
            </div>

            <hr class="mt-2 mb-2" />
        </div>
    );

}

export default OpenFile;
