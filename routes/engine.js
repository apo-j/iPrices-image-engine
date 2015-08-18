var _ = require('underscore');
var config = require(__dirname + '/../config.js');
var multer  = require('multer');
var upload = multer({ dest: __dirname + '/../uploads/' });
var cv = require('opencv');


function Engine(app, router, db, crypto) {
    var self = this;

    //CORS configuration
    app.all("/image-engine/*", function (req, res, next) {
        if(req.method === 'OPTIONS' || req.headers.apikey === config.apiKey){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "apiKey, api, Cache-Control, Pragma, Origin, Authorization, Content-Type, Current-Version");
            res.header("Access-Control-Allow-Methods", "POST");
            res.header('Access-Control-Expose-Headers' , 'Current-Version');
            res.header('Current-Version' , config.version);

            return next();
        }else{
            res.json({"status": 403, "Message": "Forbidden", data:[]});
        }
    });

    app.use('/image-engine', router);

    self.handleRoutes(db, router, crypto);
}

Engine.prototype.handleRoutes = function (db, router, crypto) {
    var self = this;

    router.get("/", function (req, res) {
        res.json({"Message": "Hello World !"});
    });

    router.post("/search/", upload.single('queryImage'), function(req, res){
        cv.readImage(__dirname + '/../uploads/.png', function(err, im){
            im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
                for (var i=0;i<faces.length; i++){
                    var x = faces[i]
                    im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
                }
                im.save('./out.jpg');
            });
        })
        res.json({"Message": "Searching !"});
        //var query = "SELECT users.username, users.email, roles.id as roleId, roles.code as role "
        //    +"FROM users "
        //    +"INNER JOIN roles on users.roleId = roles.id "
        //    +"WHERE (':username' = '' or users.username like '%:username%') "
        //    +"AND (':email' = '' or users.email like '%:email%') "
        //    +"AND (:role  = 0 or users.roleId = :role) "
        //
        ////todo security issues
        //query = query.replace(/:username/ig, req.body.username || '').replace(/:email/ig, req.body.email|| '').replace(/:role/ig, req.body.role||0);
        //db.sequelize.query(query, {type: db.sequelize.QueryTypes.SELECT}).then(function(users){
        //    res.status(200);
        //    res.json({"Message": "OK", data: users});
        //})
    })

}

module.exports = Engine;
