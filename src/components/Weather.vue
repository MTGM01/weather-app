<script>
import axios from 'axios';

export default {
    name: 'Weather',
    data() {
        return {
            cityName: '',
            appId: '5db1c1ac5a5341d4bac165638241606',
            apiUrl: 'http://api.weatherapi.com/v1/current.json',
            date: '',
            isLoading: false,
            weatherResponse: null
        }
    },
    methods: {
        keyPressHandler(objectEvent) {
            if (objectEvent.key === 'Enter') {
                document.body.style.backgroundImage = 'url(/images/Jowhareh_galleries_4_poster_06e528e6-d821-4ee5-85b8-8eb4f22d8d86.jpeg)'
                this.cityName = objectEvent.target.value
                this.isLoading = true
                // fetch(`${this.apiUrl}?key=${this.appId}&q=${this.cityName}`)
                //     .then(data => data.json())
                //     .then(res => this.weatherResponse = res)
                //     .catch(err => console.error(err))
                this.dateSeter()
                this.fetchWeatherApiData()
            }
        },
        async fetchWeatherApiData() {
            // const data = await fetch(`${this.apiUrl}?key=${this.appId}&q=${this.cityName}`)
            // const response = await data.json()
            const response = await axios.get(`${this.apiUrl}?key=${this.appId}&q=${this.cityName}`)
            this.isLoading = false
            this.weatherResponse = response.data

        },
        dateSeter() {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
            const today = new Date()
            const month = months.find((month, i) => today.getMonth() === i)
            const year = today.getFullYear()
            const day = days.find((day, i) => today.getDay() + 1 === i) + ' ' + today.getDate().toString()
            this.date = `${day} ${month} ${year}`
        }
    }
}  
</script>

<template>

    <section v-if="!isLoading" class="container">

        <input type="text" @keypress="keyPressHandler" placeholder="Name City" name="nameCity" id="city" />

        <div v-if="cityName" class="name-date-container">
            <span class="name">
                {{ weatherResponse?.location?.name }}, {{ weatherResponse?.location?.country }}
            </span>
            <span class="date">
                {{ date }}
            </span>
            <span class="date">
                {{ this.weatherResponse?.location?.localtime?.substring(11) }}
            </span>
        </div>

        <div v-if="cityName" class="temp-container">
            <span>
                {{ weatherResponse?.current?.temp_c }} °C
            </span>
        </div>

        <div v-if="cityName" class="weather-status-container">
            <img :src="weatherResponse?.current?.condition?.icon" alt="weather-icon"
                :title="weatherResponse?.current?.condition?.text" />
            <span>
                {{ weatherResponse?.current?.condition?.text }}
            </span>
        </div>

    </section>

    <p class="loading" v-else>Loading ...</p>

</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    width: 100%;
}

#city {
    transition: all ease-in-out 0.4s;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    width: 99%;
    border: none;
    outline: none;
    padding: 7px 5px 7px 10px;
    font-size: 20px;
    font-family: 'Times New Roman', Times, serif;
    font-weight: 700;
    color: white;
    background-color: rgb(53, 48, 48);
}

#city:focus {
    transition: all ease-in-out 0.4s;
    border-top-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0;
}

#city::placeholder {
    color: white;
}

.name-date-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.name {
    color: white;
    font-family: 'Times New Roman', Times, serif;
    font-weight: 600;
    font-size: 40px;
}

.date {
    color: white;
    font-family: 'Times New Roman', Times, serif;
    font-weight: 600;
    font-size: 25px;
}

.temp-container {
    background-color: rgb(51, 45, 45);
    border-radius: 10px;
    box-shadow: 1px 2px 3px grey;
    padding: 20px;
    color: white;
    font-family: 'Times New Roman', Times, serif;
    font-weight: 600;
    font-size: 50px;
}

.weather-status-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white;
    font-family: 'Times New Roman', Times, serif;
    font-weight: 600;
    font-size: 25px;
    gap: 10px;
}

.loading {
    text-align: center;
    color: white;
    font-family: 'Times New Roman', Times, serif;
    font-weight: 700;
    font-size: 35px;
}
</style>