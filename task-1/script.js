function highlightWords() {
    var inputText = document.getElementById("paragraphInput").value;
    var paragraph = document.getElementById("paragraph");
    var text = inputText;

    var words = text.split(/\s+/);

    for (var i = 0; i < words.length; i++) {
        var word = words[i];

        if (word.length > 8) {
            var span = document.createElement("span");
            span.textContent = word;
            span.classList.add("highlight");

            text = text.replace(word, span.outerHTML);
        }
    }

    paragraph.innerHTML = text;
}
