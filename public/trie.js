Trie = function(){
  this.characters = {};
};

Trie.prototype.learn = function(word, index){

  index = index || 0;

  if(this.characters[word[index]]){
    this.characters[word[index]].learn(word,index+1);
  } else {
    if(index === word.length){
    this.isWord = true;
    } else {
      this.characters[word[index]] = new Trie();
      this.characters[word[index]].learn(word,index+1);
    }
  }
  
};


Trie.prototype.getWords = function(words, currentWord){

  words = words || [];
  currentWord = currentWord || '';

  if(this.isWord){
    words.push(currentWord);
  }
  for (var char in this.characters){
    var newWord = currentWord + char;
    if(this.characters[char].characters){
      this.characters[char].getWords(words, newWord);
    }
  }
  return words;

};

Trie.prototype.find = function(word, index){

  index = index || 0;

  if (index === word.length){
    return this;
  } else if (this.characters[word[index]]){
    return this.characters[word[index]].find(word,index+1);
  } else {
    return false;
  } 
};

Trie.prototype.autoComplete = function(prefix){
  
    var result = this.find(prefix);
    if(!result){return [];} 
    var res = result.getWords([],prefix);
    console.log(res);
    return result.getWords([],prefix);

};


