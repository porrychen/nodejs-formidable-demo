/**
 * Created by JetBrains WebStorm.
 * User: porrychen
 * Date: 1/5/12
 * Time: 5:01 PM
 * To change this template use File | Settings | File Templates.
 */
config = module.exports = {
    port: 5000,
    files: {
        max_size: 2,
        max_fields_size: (2 * 1024 * 1024), // Limits the amount of memory a field (not file) can allocate in bytes  (2MB in this case)
        upload_dir: './data'
    }
};