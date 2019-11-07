export default function makeNodesClickable(propsData, func) {
    if (!propsData) return { name: "hello" };
    //NOTE: assuming nothing yet clickable in gProps and that gProps exists:
    //nothing should be clickable b/c coming from mini tree where nodes shouldn't be clickable
    //and gProps should exist because classnames which dictate node color should be present in mini tree
    propsData.gProps.onClick = func;
    const children = propsData.children;
    if (!children) return;
    for (var i = 0; i < children.length; i++) {
        const child = children[i];
        makeNodesClickable(child);
    }
    return propsData;
}