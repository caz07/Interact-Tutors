subjectNames = [
    ["math"],
    ["science"],
    ["english"],
    ["social"],
    ["cs"],
    ["language"],
    ["business"]
]

// Changes whether textareas are enabled when a checkbox is clicked
function handleTextareas() {
    // When a checkbox is clicked, change which textareas are enabled
    subjectCheckboxes = document.querySelectorAll(".subject input[type='checkbox']");
    subjectCheckboxes.forEach(checkbox => {
        checkbox.onchange = function() {
            changeTextareas(checkbox.getAttribute("name"));
        }
    })

    // When window first loads, change which textareas are enabled based on number of checkboxes clicked (after form validation)
    subjectLists = document.querySelectorAll(".subject ul");
    subjectLists.forEach(subjectList => { 
        changeTextareas(subjectList.getAttribute("id"))
    })
}

// Determines which textareas are enabled based on which checkboxes are selected
function changeTextareas(subjectName) {
    checkedCount = document.querySelectorAll(`#${subjectName} input[type='checkbox']:checked`).length; // Count number of checkboxes checked in the subject

    // Get textarea and textarea label corresponding to subject
    textarea = document.getElementById(`${subjectName}Experience`);
    textareaID = textarea.getAttribute("id");
    textareaLabel = document.querySelector(`label[for='${textareaID}']`);

    if (checkedCount === 0) // If no classes are selected, disable subject textarea
    {
        textarea.setAttribute("disabled", "true")
        textarea.setAttribute("placeholder", "Field will be enabled when you check a box under this subject.")
        textarea.value = "";
        if (textarea.nextSibling)
        {
            textarea.nextSibling.remove() // Remove character count <span> generated by textCounter()
        }
    }
    else if (textarea.getAttribute("disabled")) // If one or more classes are selected (implied) and the textarea is still disabled, enable subject textarea
    {
        textarea.removeAttribute("disabled")
        textarea.removeAttribute("placeholder")
    }
}

// Character count for textareas, code modified from https://stackoverflow.com/questions/54811160/active-character-count-of-wtforms-textareafield/54815754
function textCounter(field, limit) {
    var typedChars = $(field).val().length;

    if ($(field).next('span').length)
    {
        $(field).next('span').text(typedChars+' / '+limit);
    }
    else
    {
        $(`<span>${typedChars+' / '+limit}</span>`).insertAfter(field);
    }

    $(field).next('span').css('color', typedChars > limit ? 'red' : '')
}

// Changes submit button HTML on form submission
function formLoading() {
    submitBtn = document.querySelector(".submit-btn");
    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span class='spinner-border spinner-border-sm'></span>Please wait...";
    submitBtn.style.pointerEvents = "none";
}

function run()
{
    handleTextareas();
}

run()
