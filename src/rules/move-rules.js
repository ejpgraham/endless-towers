export default function moveRules(discBeingHeld, discStack ){
  if (discBeingHeld < discStack[0] || discStack.length === 0){
    return true;
  }
  return false;
}
