//IIFE
(function()
{

    function Start()
    {
        console.log("App Started!");

       $("a.delete").on("click", function(event)
       {
            if(!confirm("Are you sure?"))
            {
                event.preventDefault();
                const redirect_page = event.target.getAttribute('data-redirect') || "";
                location.href = "/" + redirect_page;
            }
       });
    }

    window.addEventListener("load", Start);

})();