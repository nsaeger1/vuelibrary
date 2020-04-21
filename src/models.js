export const modelMixin = {
    methods:{
        Game(name, avgTime, minPlayer, maxPlayer) {
            this.name = name;
            this.avgTime = avgTime;
            this.minPlayer = minPlayer;
            this.maxPlayer = maxPlayer;
        },
        User (firebaseUser ){
            let m = {
                displayName: '',
                email: '',
                photoURL: '',
                uid: '',
            };

            if(firebaseUser){
                m.displayName = firebaseUser.displayName ? firebaseUser.displayName : '';
                m.email = firebaseUser.email ? firebaseUser.email : '';
                m.photoURL = firebaseUser.photoURL ? firebaseUser.photoURL : '';
                m.uid = firebaseUser.uid ? firebaseUser.uid : '';
            }

            return m;
        }

    }
};
