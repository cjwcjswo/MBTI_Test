function onLoad()
{
    $('#title-page').show();
}

onLoad();

function start()
{
    $('#title-page').hide();
    $('#main-page').show();
    next();
}

let currNum = 1;

function nextButton(answerIndex)
{
    answerArray.push(answerIndex);
    ++currNum;

    if (currNum > questionData.length)
    {
        $('#main-page').hide();

        for (let i = 0; i < answerArray.length; ++i)
        {
            let answer = `<li>${i+1}. ${String.fromCharCode(97+answerArray[i])}</li>`;
            $('#result-answer').append(answer);
        }
        $('#result-page').show();
        return;
    }

    $(".progress-bar").attr("style", "width: calc(100 / " + questionData.length + " * " + currNum + "%)");
    $('#main-choice').empty();
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

    $('#main-text').html(currQuestionData.text);
    $('#main-question').html(currQuestionData.question);

    for (let i = 0; i < currQuestionData.answers.length; ++i) 
    {
        let currAnswerData = currQuestionData.answers[i];
        let buttonHTML = `<button type="button" class="btn btn-dark mt-2" onclick="nextButton(${i});">${currAnswerData.text}</button></br>`;
        
        $('#main-choice').append(buttonHTML);
    }
}