function recursiveGetPath(match, pathOfNodes, startingTree) {
    console.log(pathOfNodes)
    if (startingTree['name'] === match) {
        return pathOfNodes;
    }
    const children = startingTree.children;
    if (!children) return;
    for (var i = 0; i < children.length; i++) {
        const child = children[i];
        const copyOfPath = [...pathOfNodes];
        copyOfPath.push(child.name)
        const path = recursiveGetPath(match, copyOfPath, child);
        if (path) return path;
    }
}

function addWithPathToNode(pathToNodeArray, newData, childText, tabValue, self, func) {
    // if (pathToNodeArray.length === 1) return data;
    var cursor = newData;
    while (pathToNodeArray.length !== 1) {
        pathToNodeArray.shift();
        cursor = cursor.children.filter(child => child.name === pathToNodeArray[0])[0];
        if (pathToNodeArray.length === 1) break;
    }
    const proOrConClass = tabValue === 0 ? 'pro-node' : 'con-node';
    if (cursor.children) {
        cursor.children.push({
            "name": childText,
            "gProps": {
                "className": proOrConClass,
                "onClick": func
            }
        })
    } else {
        cursor.children = [
            {
                "name": childText,
                "gProps": {
                    "className": proOrConClass,
                    "onClick": func
                }
            }];
    }
    return newData;
}

export default function addNode(parent, childText, tabValue, arrayWithRoot, startingTree, self, func) {
    console.log("parent");
    console.log(parent);
    console.log("arrayWithRoot");
    console.log(arrayWithRoot);
    console.log("startingTree")
    console.log(startingTree)
    console.log("func");
    console.log(func);
    const treeCopy = Object.assign({}, startingTree);
    var pathToNode = recursiveGetPath(parent, arrayWithRoot, treeCopy);
    const newData = Object.assign({}, startingTree);
    return addWithPathToNode(pathToNode, newData, childText, tabValue, self, func);
}