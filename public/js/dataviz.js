let ctx = document.getElementById("chartBar");
console.log(ctx.dataset.maleusers);
console.log(ctx.dataset.femaleusers);
//new Chart(ctx,{
//     type: 'bar',
//     data: {
//         labels: ["Red", "Yellow", "Blue"],
//         datasets: [{
//             data:[10,20,30],
//         }]
//     }
// });


//---Répartition par genre
new Chart(ctx,{
    type: 'bar',
    data: {
      labels: ["Homme","Femme","Plus"],
      datasets: [
        {
          label: "Client (personne)",
          backgroundColor: [ '#A54196', '#4BACAE', '#D8C43F'],
          data: [ctx.dataset.maleusers, ctx.dataset.femaleusers, ctx.dataset.otherusers]
        
        }
      ]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: { display: false },
      title: {
        display: true,
        text: 'Répartition par genre'
      },
      
    }
});

//---Nombre de messages lus et non lus
ctx = document.getElementById("chartDoughnut");
console.log(ctx.dataset.read);
console.log(ctx.dataset.unread);
new Chart(ctx,{
    type: 'doughnut',
    data: {
      labels: ["Lus","Non Lus"],
      datasets: [{
        label: 'My First Dataset',
        data: [ctx.dataset.read, ctx.dataset.unread],
        backgroundColor: [
            '#55efc4',
            '#ff7675',
          ,
        ],
        hoverOffset: 4
      }]
    },
    options :{
        title: {
            display: true,
            text: 'Nombre de messages'
          }
    },
});

//---Nombre de commandes payées
ctx = document.getElementById('chartPie');
console.log(ctx.dataset.sended)
console.log(ctx.dataset.unsended)
new Chart(ctx,{
    type: 'pie',
    data: {
      labels: ["Expédiées","Non Expédiées"],
      datasets: [{
        label: 'Commandes',
        data: [ctx.dataset.sended, ctx.dataset.unsended],
        backgroundColor: [
            '#6c5ce7',
            '#fdcb6e',
          ,
        ],
        hoverOffset: 4
      }]
    },
    options :{
        legend: { display: false },
        title: {
            display: true,
            text: 'Commandes expédiées / non-expédiées'
          }
    },
});

//---Chiffres d'affaires par mois
ctx = document.getElementById('chartLine');
var month = ["january","february","march","april","may","june","july","august","september","october","november","december"]

var datas = [];
for( let i = 0; i < 12; i++ ){
      if(ctx.dataset.i == month[i]){
        datas.push(ctx.dataset.month[i])
      }else{
          datas.push(0);
      }   
};

new Chart(ctx,{
    type: 'line',
    data: {
      // labels: ["January","February","March","April","May","June","July","August","September","October","November","December"],
      labels: ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Decembre"],
      //Utils.months({count: 12}),
      // déf. labels en focntion des mois et les afficher.
      datasets: [{
        label: "2019",
        // afficher les valeurs de chaque mois
        data: [65, 59, 80, 81, 56, 55, 40, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        hoverOffset: 4,
      }],
    },
    options :{
        title: {
            display: true,
            text: "Chiffres d'affaires par mois"
          }
    },
});
