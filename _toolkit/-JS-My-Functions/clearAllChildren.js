function ClearAllChildren(parentID){
  while (parentID.hasChildNodes()){
    parentID.removeChild(parentID.lastChild);
  }
}
