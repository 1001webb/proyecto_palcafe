const router = require('express').Router();

const Ingrediente = require('../models/Ingrediente');
const { isAuthenticated } = require('../helpers/auth')

router.get('/ingredientes/add', isAuthenticated, (req, res) => {
    res.render('ingredientes/new-ingrediente');
});

router.post('/ingredientes/new-ingrediente', isAuthenticated, async(req, res) => {
    const { nombre, descripcion, precio, cantidad, unidadMedida } = req.body;
    const errors = [];
    if (!nombre) {
        errors.push({text: "Escriba un nombre"});
    }
    if (!descripcion) {
        errors.push({text: "Escriba una descripcion"});
    }
    if (!precio) {
        errors.push({text: "Escriba un precio"});
    }
    if (!cantidad) {
        errors.push({text: "Escriba una cantidad"});
    }
    if (unidadMedida == "TipoUnidad") {
        errors.push({text: "Seleccione una unidad de medida"})
    }
    if (errors.length > 0) {
        res.render('notes/new-note', {
            errors,
            nombre,
            descripcion,
            precio,
            cantidad
        });
    } else {
        const newIngrediente = new Ingrediente({nombre, descripcion, precio, unidadMedida, cantidad});
        newIngrediente.user = req.user.id;
        await newIngrediente.save();
        req.flash('success_msg', 'Ingrediente guardado exitosamente');
        res.redirect('/ingredientes');
    }  
});

router.get('/ingredientes', isAuthenticated, async(req, res) => { //can be more explicit in search
    const ingredientes = await Ingrediente.find().sort({date: 'desc'}).lean();
    res.render('ingredientes/all-ingredientes', { ingredientes });
});

router.get('/ingredientes/edit/:id', isAuthenticated, async(req, res) => {
    const ingrediente = await Ingrediente.findById(req.params.id).lean();
    res.render('ingredientes/edit-ingrediente', {ingrediente});
});

router.put('/ingredientes/edit-ingrediente/:id', isAuthenticated, async(req, res) => {
    const { nombre, descripcion, precio, cantidad, unidadMedida } = req.body;
    await Ingrediente.findByIdAndUpdate(req.params.id, {nombre, descripcion, precio, cantidad, unidadMedida}).lean();
    req.flash('success_msg', 'Ingrediente actualizado exitosamente');
    res.redirect('/ingredientes');
});

router.delete('/ingredientes/delete/:id', isAuthenticated, async(req, res) => {
    await Ingrediente.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Ingrediente eliminado exitosamente');
    res.redirect('/ingredientes');
});

module.exports = router;