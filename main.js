document.addEventListener("DOMContentLoaded", function () {
    let url = "https://v2.jokeapi.dev/joke/Any?safe-mode";
    let btn = document.getElementById("getJokeBtn");
    let jokeDisplay = document.getElementById("jokeDisplay");

    btn.addEventListener("click", async () => {
        console.log("Btn was Clicked");
        try {
            let { setup, delivery } = await getJoke();
            let completeJoke = `${setup} ${delivery}`;
            jokeDisplay.textContent = completeJoke;
        } catch (error) {
            console.log("Error - ", error);
            jokeDisplay.textContent = "Try again, Can't fetch the joke";
        }
    });

    async function getJoke() {
        try {
            let response = await axios.get(url);
            console.log("API Response:", response.data); // Log the response data
            if (response.data && response.data.setup && response.data.delivery) {
                return {
                    setup: response.data.setup,
                    delivery: response.data.delivery,
                };
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err) {
            console.log("Error - ", err);
            throw err;
        }
    }
});
