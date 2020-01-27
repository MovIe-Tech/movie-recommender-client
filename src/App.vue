<!--suppress ALL -->
<template>
    <v-app id="inspire">
        <v-app-bar
                app
                color="indigo"
                dark
        >
            <v-toolbar-title>Movie Recommender</v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-form>
                <v-col>
                    <v-text-field
                            label="好きな文章を入力"
                            id="input"
                            v-model="input"
                            :loading="isLoading"
                            :disabled="isLoading"
                    />
                </v-col>
                <v-col align="end">
                    <v-btn
                            color="success"
                            class="mr-4"
                            @click="search"
                    >
                        Search
                    </v-btn>
                </v-col>
            </v-form>
            <v-col v-if="this.movies.length>0">
                <v-card
                        class="mx-auto"
                        max-width="500"
                        tile
                >
                    <v-list>
                        <v-list-item
                                v-for="(movie, i) in movies"
                                :key="i"
                                @click="googleSearch(movie.title)"
                        >
                            <v-list-item-content>
                                <v-list-item-title>{{ movie.title }}</v-list-item-title>
                                <v-list-item-subtitle>
                                    <v-icon>mdi-star</v-icon>
                                    {{ movie.rate }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon>
                                    <v-icon color="grey lighten-1">mdi-chevron-right</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
            <v-col v-if="this.isFeedBacking">
                <v-card
                        class="mx-auto"
                        max-width="500"
                        tile
                >
                    <v-card-title>フィードバックにご協力ください</v-card-title>
                    <v-card-subtitle>気になる映画はいくつありましたか?</v-card-subtitle>
                    <v-form>
                        <v-col>
                            <v-select
                                    :items="nums"
                                    label="選択"
                                    required
                                    value="0"
                                    v-model="evaluation"
                            ></v-select>
                        </v-col>
                        <v-col align="end">
                            <v-btn @click="feedBack">
                                送信
                            </v-btn>
                        </v-col>
                    </v-form>
                </v-card>
            </v-col>
        </v-content>
        <v-footer
                color="indigo"
                app
        >
            <span class="white--text">&copy; 2019 MovIe Tech Team</span>
        </v-footer>
    </v-app>
</template>
<script>
    import firebase from 'firebase'

    export default {
        created: function() {
            this.database = firebase.database();
        },
        data: () => ({
            input: null,
            isLoading: false,
            isFeedBacking: false,
            isRandomize: false,
            movies: [],
            nums: ["0", "1", "2", "3", "4", "5"],
            evaluation: 0,
        }),
        methods: {
            search() {
                this.isLoading = true;
                // fetch("http://118.27.11.253:8888/reply?input=" + this.input, {
                fetch("http://localhost:18888/reply?input=" + this.input, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(movies => {
                        this.movies = [];
                        for (let i = 1; i <= 5; i++) {
                            this.movies.push(
                                {
                                    "title": movies["" + i]["title"],
                                    "rate": movies["" + i]["rate"],
                                }
                            );
                            this.isRandomize = movies.randomize;
                        }
                        this.isLoading = false;
                        this.isFeedBacking = true;
                    })
                    .catch(() => {
                        this.isLoading = false;
                    });
            },
            feedBack() {
                this.database.ref("/evaluation").push({
                    eval: this.evaluation,
                    randomize: this.isRandomize,
                });
                this.isFeedBacking = false;
            },
            googleSearch(text) {
                window.open("https://www.google.com/search?q=" + text, "_blank");
            },
        }
    }
</script>