let  fruits = [
    { id: 1, title: 'Яблоки', price: 30, img: 'https://avatars.mds.yandex.net/get-pdb/234183/00127b4b-3cdd-4495-8916-8cfaaa3d96b0/s1200?webp=false' },
    { id: 2, title: 'Апельсины', price: 50, img: 'https://foodformula.ru/wp-content/uploads/2018/03/orange-1024x653.jpg' },
    { id: 3, title: 'Манго', price: 70, img: 'https://facty.mblycdn.com/uploads/fh/2017/08/shutterstock_573811510.jpg' }
];

const toHtml = fruit => `
    <div class="col">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${fruit.img}" alt="Card image cap" alt="${fruit.title}"/>
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Узнать цену</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
            </div>
        </div>
    </div>
`;

function render() {
    const html = fruits.map(fruit => toHtml(fruit)).join('');
    document.querySelector('#fruits').innerHTML = html
}
render();

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
     width: '400px',
    footerButtons: [
        { text: 'Закрыть', type: 'danger', handler() {
            priceModal.close()
        }},
    ]
});

document.addEventListener('click', event => {
    event.preventDefault();
    const btnType = event.target.dataset.btn;
    const id = +event.target.dataset.id;
    const fruit = fruits.find(f => f.id === id);

   if(btnType === 'price') {
       priceModal.setContent(`
        <p>Цена на фрукт ${fruit.title} : <strong>${fruit.price}$</strong></p>
       `);
       priceModal.open();
   } else if(btnType === 'remove') {
       $.confirm({
           title: 'Вы уверены?',
           content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
       }).then(() => {
        console.log('Remove');
        fruits = fruits.filter(f => f.id !== id);
        render();
       }).catch(() => {
        console.log('Cancel');
       });
   }
});
