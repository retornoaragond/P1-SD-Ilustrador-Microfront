<template>
        <div class="container">
        <h1>Ilustrators</h1>
            <div class="table-responsive">
                <table class="table table-bordered " style="width:100%;">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='ilus in this.ilustrators'>
                            <td>{{ilus.name}}</td>
                            <td>
                                <router-link class="button" :to="'/ilustrator/'+ilus.id"><img src="./images/font-eye.png" style="width:20px"></router-link>
                                <router-link class="button" :to="'/ilustrator/edit/'+ilus.id"><img src="./images/font-edit.png" style="width:20px"></router-link>
                                <!-- <router-link class="button" :to="'/ilustrator/delete/'+ilus.id"><img src="./images/delete.png" style="width:20px"></router-link>-->
                                <!-- <router-link class="button" to="/ilustrator" @click="deleteIlustrator(ilus.id)" ><img src="./images/delete.png" style="width:20px"></router-link> -->
                                <button type="button" class="btn btn-primary" v-on:click="deleteIlustrator(ilus.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <router-link class="btn btn-primary" :to="'/ilustrator/create'">Create</router-link>
        </div>
</template>

<script>
module.exports = {
    props:['title'],
    data:function () {
        return {
            ilustrators:[]
        }
    },
    created () {
        this.getIlustrators()
    },
    methods: {
        getIlustrators(){
            fetch('https://p1-sd-ilustrador-microservice.herokuapp.com/ilustrador',{ headers: {'Accept': 'application/json'}})
            .then((response) => response.json())
            .then((data) => {
                this.ilustrators = data;
            })
        },
        deleteIlustrator(id){
            console.log('Hola1 '+id);
            const opc = {
                method:"POST",
                headers:{"Content-Type": "application/json"}
            };
            fetch("https://p1-sd-ilustrador-microservice.herokuapp.com/ilustrador/delete/"+id,opc)
                .then((data) => {
                console.log('Print1: ' + data.name);
            })

        }
    }
}

</script>