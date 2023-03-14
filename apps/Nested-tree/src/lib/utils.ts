import type { InputList, TreeArray } from '@/types/index.js';

/**
 * 根據輸入的資料來創建資料結構
 * @param {objList}
 * @returns {TreeArray} 
 * 輸出資料如下
 * [{
 *      name?: string,
        value?: string | null,
        isOpen?: boolean
        child?: [] | Array<TreeStructure>
 * }]
 */
export function $createTreeStructure(inputList: InputList): TreeArray {
    const result: TreeArray = [];
    inputList.forEach((obj) => {
        const keys = obj.key.split('.');
        let currentObj = result;
        keys.forEach((key, index) => {
            let existingObj = currentObj.find((item) => item.name === key);
            if (!existingObj) {
                existingObj = { name: key, value: null, child: [], isOpen: true };
                currentObj.push(existingObj);
            }
            currentObj = existingObj.child as TreeArray;
            if (index === keys.length - 1) {
                existingObj.value = obj.value;
            }
        });
    });
    return result;
}
