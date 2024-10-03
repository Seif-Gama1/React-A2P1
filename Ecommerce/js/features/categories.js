import {mainElement,
    categoriesElement,
} from "../shares/ui/dom-element.js";

const categoriesSuccess = function(data){ //success

    mainElement.removeClass("d-none").addClass("row");    
    categoriesElement.html(
        data.map((item) => `<li class="py-2 px-1 fs-5" id="${item.slug}">${item.name}</li>`).join("")
    );
}

export default categoriesSuccess;