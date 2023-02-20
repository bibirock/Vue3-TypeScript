## Nested-tree-demo

-   專案啟動 `npm run dev`

### 遇到的問題 :

### - 需定義轉換後的資料格式方便使用遞迴組件來做渲染

-   因為使用樹狀結構需要使用陣列來遍歷，所以定義資料為陣列物件型態，先定義如下

```typescript
interface TreeStructure [{
    name?: string, // 渲染中組件的 Node 名稱
    value?: string | null, // 渲染組件中的 Leaf 名稱，可為空null
    isOpen?: boolean // 控制 Node 可以進行開合關閉
    child?: [] | Array<TreeStructure> // 如果不止一個節點，就將同樣的結構放進去往下渲染
}]
```

-   定義完之後為實作資料結構的演算法，這邊思考了一下才完成，以下將以 _pseudocode_ 進行簡單的說明：
