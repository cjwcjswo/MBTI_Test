function onLoad() 
{
    let category = getParameter('category');
    let finalScore = getParameter('s');
    if (category != "")
    {
        $('#title-page').hide();

        let finalRatio = Math.ceil(finalScore/currScore * 100);
        if (finalRatio < 100)
        {
            $('#final-score').css('color', 'RGB(172, 193, 255)');
            $('#final-score').html(`-${100 - finalRatio}% (${Math.ceil(finalScore)}만원)`);
        } 
        else if (finalRatio > 100)
        {
            $('#final-score').css('color', 'RGB(190, 58, 78');
            $('#final-score').html(`+${finalRatio - 100}% (${Math.ceil(finalScore)}만원)`);
        }
        else
        {
            $('#final-score').html(`${finalRatio}% (${Math.ceil(finalScore)}만원)`);
        }
    
        let resultData = findResultData(category);
        $('.result-img').attr('src', resultData.img);
        $('#result-title').html(resultData.title);
        $('#result-text').html(resultData.text);
        
        for (let i = 0; i < resultData.details.length; ++i)
        {
            let resultText = `<li>${resultData.details[i]}</li>`;
            $('#results').append(resultText);
        }

        $('#result-page').show();
    }
    else
    {
        $('#title-page').show();
    }
}

onLoad();

function start() 
{
    $('#title-page').hide();
    $('#main-page').show();

    next();
}

function next() 
{
    let currIdx = currNum - 1;
    let currQuestionData = questionData[currIdx];
    
    if (currQuestionData.img === "") 
    {
        $('.main-img').hide();
    }
    else 
    {
        $('.main-img').attr('src', currQuestionData.img);
        $('.main-img').show();
    }

    $('#text').html(currQuestionData.text);
    $('#question').html(currQuestionData.question);

    for (let i = 0; i < currQuestionData.options.length; ++i) 
    {
        let currOptionData = currQuestionData.options[i];
        let buttonHTML = `<button type="button" class="btn btn-dark mt-2" onclick="nextButton(${currOptionData.score}, ${currOptionData.dangerScore}, ${currOptionData.knowledgeScore});">${currOptionData.answer}</button></br>`;
        
        $('#choice').append(buttonHTML);
    }
}

function nextButton(score, dangerScore, knowledgeScore) {
    ++currNum;

    if (score != 0)
    {
        let randScore =  rand(-1 * score, score);
        currScore += currScore * randScore / 100;

        if (currScore < 0)
        {
            currScore = 0;
        }
        console.log("CurrScore: " + currScore);
        console.log("RandScore: " + randScore);
    }
    currKnowledgeScore += knowledgeScore;
    currDangerScore += dangerScore;

    if (currNum > questionData.length)
    {
        let dangerLevel = calcDangerLevel(currDangerScore);
        let knowledgeLevel = calcKnowledgeLevel(currKnowledgeScore);
        let resultPostfix = dangerLevel + "_" + knowledgeLevel;
        window.location.href = "index.html?category=" + resultPostfix + "&s=" + currScore;
        return;
    }

    $(".progress-bar").attr("style", "width: calc(100 / " + questionData.length + " * " + currNum + "%)");
    $('#choice').empty();
    next();
}
