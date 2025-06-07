let text="";

const stopwords=[
    "the", "and", "to", "in", "of", "a", "for", "with", "on", "this", "that", "it", "which", "an",
    "from", "they", "by", "its", "is", "as"
];

const ctx=document.getElementById("myChart").getContext('2d');

const chart=new Chart(ctx, {
    type: "bar",
    data: {},
    options: {
        responsive: true,
    }
})

function updateChart(){
    text=document.getElementById("textInput").value; //비어있던text는 input value로 업데이트 
    chart.data=getChartData(text);//만들어놓은 차트의 비어있는 데이터를 getChartData함수에 text 넣은 출력값으로 업데이트 
    chart.update(); //업데이트한 data 써서 차트를 업데이트 
}

function getChartData(text, topn=30){
    //단어 배열 만들기
    const words=text.toLowerCase().match(/[a-z가-힣]+/g) || [];

    //카운터 객체 만들기 {단어: 빈도}
    const frequency = {};

    words.forEach(word=>{
        frequency[word]=(frequency[word] || 0) + 1; 
    }) 
    
    //불용어 제거 
    for (stop of stopwords) {
        frequency[stop] = 0;
    }

    //지금은 객체 원소들이 key가 먼저 등장한 순서대로 정렬. value 값 높은 순으로 정렬해줘야 함. 
    const sorted=Object.entries(frequency).sort(([,a],[,b])=>b-a); //sort 쓰려면 배열이어야 하니까 배열로 변환 후 sort로 value 내림차순 정렬.
    //상위 30개만 저장하기
    const freq_sorted=Object.fromEntries(sorted.slice(0,topn)); //sort된 배열을 다시 객체로 되돌리면 원소가 value 내림차순으로 정렬된 상태. 

    //차트용 데이터 만들기
    const chartData = {
        "labels": Object.keys(freq_sorted),
        "datasets": [
            {
            "label": "Frequency",
            "data": Object.values(freq_sorted)
            }
        ]
    };

    return chartData;
}



