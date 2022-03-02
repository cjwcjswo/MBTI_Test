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