const targetNode = document.getElementsByTagName('body')[0];

const config = { attributes: true, childList: true, subtree: true };

const findStartGameButton = () => {
  var copyLink = $("input[name='copy-link']");

  if(copyLink.length > 0){
    observer.disconnect(); 
  }

  var nextRoundButton = $("button[data-qa='close-round-result']");
  
  copyLink.parent().append('<button>Iniciar party</button>');
  
  console.log(copyLink);
  console.log(nextRoundButton);
};

const observer = new MutationObserver(findStartGameButton);

observer.observe(targetNode, config);
