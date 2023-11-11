import { JSX, createSignal } from "solid-js"
import { open } from "@tauri-apps/api/dialog"
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs'

type OpenFileProps = {
    callback: (contents: string) => void
    saveDataProvider: () => string
}

export default function OpenFile(props: OpenFileProps): JSX.Element {
    const pathPlaceHolder = "please select a file"
    const [path, setPath] = createSignal(pathPlaceHolder)
    const [autoSave, setAutoSave] = createSignal(false)
    const selectFile = async () => {
        const result = await open()
        if (result !== null) {
            const p = typeof result === "string" ? result : result[0]
            setPath(p)
            setAutoSave(false)
            const contents = await readTextFile(p)
            props.callback(contents)
        }
    }
    setInterval(async () => {
        if (autoSave()) {
            const res = props.saveDataProvider()
            await writeTextFile(path(), res)
        }
    }, 10000)
    return (
        <div>
            <div class="flex justify-between">
                <p>{path()}</p>
                <div class="flex items-center mb-4">
                    <input type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        disabled={path() === pathPlaceHolder}
                        checked={autoSave()}
                        onChange={(e) => setAutoSave(e.target.checked)} />
                    <label>
                    autoSave
                    </label>
                </div>
                <div>
                    <button class="btn" onClick={selectFile} tabindex="-1">select file</button>
                    <button class="btn" onClick={async () =>
                        await writeTextFile(path(), props.saveDataProvider())} tabindex="-1">save file</button>
                </div>
            </div>
            <hr class="mt-2 mb-2" />
        </div>
    )

}

