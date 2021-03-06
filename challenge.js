let pyramid = document.querySelector('.pyramid');
let url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
let searchUrl = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes/search/';
let search = document.querySelector('form');
let modal = document.querySelector('.modal');
let close = document.querySelector('.close-button');
let modalContent = document.querySelector('.modal-content');
for (let i=1; i<=5; i++){
    for(let j=1; j<=i; j++){
        let subject = document.createElement('div');
        subject.classList.add('pyramid-subject');
        subject.addEventListener('click', respond);
        close.addEventListener('click', closeModal)
        function respond(e){
            e.preventDefault();
            console.log(e.target, 'target')
            console.log(e);
            if(e.target == subject){ 
                modal.classList.add('modalOpen');
            } 
            fetch(url)
                .then(res=>{
                    return res.json();
                })
                .then(res=>{
                // console.log('Bully for you!')
                modalContent.innerText = res[0];
                })
            // console.log('This is an excellent rectangle!')
            }
        let row = document.querySelector(`.row-${i}`);
        row.appendChild(subject);
        }
        search.addEventListener('submit', searchQuote);
        function searchQuote(e){
            e.preventDefault();
            let input = document.querySelector('.input');
            let searchValue = input.value;
            let quoteUrl = searchUrl+searchValue;
            fetch(quoteUrl).then(res=>{
                return res.json();
            })
            .then(res=>{
                modalContent.innerText = res[0];
            })
            if(e.target == search){ 
                modal.classList.add('modalOpen');
            } else{
                modal.style.display = 'none';
            }
}
};
function closeModal(e){
    e.preventDefault();
    //Something with the display is causing the animation to not work.
    modal.classList.add('modal-close');
    modal.addEventListener('animationend', closed);
    function closed(e){
        if(e.target == modal){
            modal.classList.remove('modalOpen');
            modal.classList.remove('modal-close');
            modal.removeEventListener('animationend', closed)
            console.log(e)
        }
    }
}