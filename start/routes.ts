/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import swagger from "#config/swagger";
import  AutoSwagger  from "adonis-autoswagger";
import BasicAuthMiddleware from "#middleware/basic_auth_middleware";

router.get('/', async ({ view }) => {
  return view.render('welcome')
})
// returns swagger in YAML
router.get("/swagger", async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger);
});

// Renders Swagger-UI and passes YAML-output of /swagger
router.get("/docs", async () => {
  return AutoSwagger.default.ui("/swagger", swagger);
  // return AutoSwagger.default.scalar("/swagger", swagger); to use Scalar instead
  // return AutoSwagger.default.rapidoc("/swagger", swagger); to use RapiDoc instead
}).middleware([new BasicAuthMiddleware().handle])
