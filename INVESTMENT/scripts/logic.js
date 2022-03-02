let questionData = JSON.parse(JSON.stringify(Questions))['questions'];
let resultData = JSON.parse(JSON.stringify(Results))['results'];

let currScore = 1000;
let currDangerScore = 0;
let currKnowledgeScore = 0;

function getParameter(name) 
{
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function findResultData(postfix)
{
    for (let i = 0; i < resultData.length; ++i)
    {
        if (postfix == resultData[i].postfix)
        {
            return resultData[i];
        }
    }

    return null;
}

function rand(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let currNum = 1;


function calcDangerLevel(dangerScore) 
{
    if (dangerScore <= 3)
    {
        return 1;
    } 
    else if (dangerScore <= 6) 
    {
        return 2;
    }
    else if (dangerScore <= 9)
    {
        return 3;
    }
    else
    {
        return 4;
    }
    
}

function calcKnowledgeLevel(knowledgeScore) 
{
    if (knowledgeScore <= 1)
    {
        return 1;
    } 
    else if (knowledgeScore <= 5) 
    {
        return 2;
    }
    else
    {
        return 3;
    }
}

// SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
Kakao.init('1ccab4dd8ab9ce0e153a8c9d0b5d08a6');

Kakao.Link.createDefaultButton({
    container: '#create-kakao-link-btn',
    objectType: 'feed',
    content: {
        title: '내가 가상화폐를 투자한다면..?',
        description: '재미로 보는 나의 가상화폐 투자 성향! 테스트 해보세요!',
        imageUrl:
            'https://cjwoov-invesetment-type.netlify.app/images/penguin.png',
        link: {
            mobileWebUrl: 'https://cjwoov-invesetment-type.netlify.app/',
            webUrl: 'https://cjwoov-invesetment-type.netlify.app/',
        },
    },
    buttons: [
        {
            title: '테스트 시작',
            link: {
                mobileWebUrl: 'https://cjwoov-invesetment-type.netlify.app/',
                webUrl: 'https://cjwoov-invesetment-type.netlify.app/',
            },
        }
    ],
});


let shareCategory = getParameter('category');
let shareScore = getParameter('s');
let shareData = findResultData(shareCategory);
let shareURL = `https://cjwoov-invesetment-type.netlify.app/index.html?category=${shareCategory}&s=${shareScore}`;
let shareImgURL = `https://cjwoov-invesetment-type.netlify.app/${shareData.img}`;

Kakao.Link.createDefaultButton({
    container: '#create-kakao-link-result-btn',
    objectType: 'feed',
    content: {
        title: '나의 가상화폐 투자 성향 결과는?',
        description: shareData.title,
        imageUrl:
            shareImgURL,
        link: {
            mobileWebUrl: shareURL,
            webUrl: shareURL,
        },
    },
    buttons: [
        {
            title: '테스트 시작',
            link: {
                mobileWebUrl: 'https://cjwoov-invesetment-type.netlify.app/',
                webUrl: 'https://cjwoov-invesetment-type.netlify.app/',
            },
        },
        {
            title: '결과 보기',
            link: {
                mobileWebUrl:shareURL,
                webUrl: shareURL,
            },
        }
    ],
});