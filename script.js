let bookmarks = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const tabBtn = document.getElementById("tab-btn");
const deleteBtn = document.getElementById("delete-btn");
const unorderedList = document.getElementById("ul-el");

let localItem;
localItem = JSON.parse(localStorage.getItem("bookmarks"));
if(localItem) {
    bookmarks = localItem;
    renderBookmarks();
}

inputBtn.addEventListener("click", () => {
    if(inputEl.value==="") {
        alert("Enter a bookmark!");
    }
    else {
        bookmarks.push(inputEl.value);
        inputEl.value = "";
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        renderBookmarks();
    }
})

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        bookmarks.push(tabs[0].url);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        renderBookmarks();
    })
})

deleteBtn.addEventListener("dblclick", () => {
    inputEl.value = "";
    bookmarks = [];
    localStorage.clear();
    renderBookmarks();
})

function renderBookmarks() {
    let list = "";
    for(let i=0 ; i<bookmarks.length ; i++) {
        list += `
                        <li>
                            <a href=${bookmarks[i]} target="_blank">
                                ${bookmarks[i]}
                            </a>
                        </li>
                    `;
    }
    unorderedList.innerHTML = list;
}