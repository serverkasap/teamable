<template>
    <div v-show="!isEditMode" id="display-view">
        <h1>User profile</h1>
        <img :src="prfImage" />

        <span>Name: </span><b id="name">{{ usrName }}</b>
        <hr />

        <span>Email: </span><b id="email">{{ usrEmail }}</b>
        <hr />

        <span>Interests: </span><b id="interests">{{ usrInterests }}</b>
        <hr />

        <button @click="handleEditProfile">Edit Profile</button>
    </div>

    <div v-show="isEditMode" id="edit-view">
        <h1>User profile</h1>
        <img :src="prfImage" />

        <span>Name: </span>
        <input type="text" id="input-name" v-model="usrName" />
        <hr />

        <span>Email: </span>
        <input type="text" id="input-email" v-model="usrEmail" />
        <hr />

        <span>Interests: </span>
        <input type="text" id="input-interests" v-model="usrInterests" />
        <hr />

        <button @click="handleUpdateProfile">Update Profile</button>
    </div>
</template>

<script>
import image from "./profile.jpeg"
export default {
    name: "App",
    data() {
        return {
            prfImage: image,
            usrName: "",
            usrEmail: "",
            usrInterests: "",
            isEditMode: false
        }
    },
    async created() {
        const userData = await this.fetchUserProfile()

        this.usrName = userData.name
        this.usrEmail = userData.email
        this.usrInterests = userData.interests
    },
    methods: {
        handleEditProfile() {
            this.isEditMode = true
        },
        async handleUpdateProfile() {
            const payload = {
                name: this.usrName,
                email: this.usrEmail,
                interests: this.usrInterests
            }

            const resJson = await this.updateUserProfile(payload)

            console.log(resJson)

            this.isEditMode = false
        },
        async fetchUserProfile() {
            const res = await fetch('get-profile')

            return await res.json()
        },
        async updateUserProfile(payload) {
            const res = await fetch('update-profile', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            return await res.json()
        }

    }
}
</script>

<style>
img {
    width: 320px;
    height: 270px;
    display: block;
    margin-bottom: 40px;
}

#display-view {
    margin: 40px auto;
    width: 80%;
}

#edit-view {
    margin: 40px auto;
    width: 80%;
}

hr {
    width: 400px;
    margin: 25px 0;
}

button {
    width: 160px;
    font-size: 15px;
    height: 45px;
    border-radius: 5px;
}

button:hover {
    cursor: pointer;
}

input {
    width: 200px;
    font-size: 15px;
    padding: 10px;
}
</style>