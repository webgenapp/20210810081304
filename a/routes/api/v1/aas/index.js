const express = require('express')
const router = express.Router()
const { Aa } = require('../../../../models')
const { auth } = require('../../../../middlewares/auth')

router.get('/', auth, async function (req, res, next) {
  const aas = await Aa.findAll()

  res.send(aas)
})

router.get('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const aa = await Aa.findOne({ where: { id } })

  res.send(aa)
})

router.post('/', auth, async function (req, res, next) {
  const aa = await Aa.build({
    ...req.body,
  }).save()

  res.status(201)
  res.send(aa)
})

router.delete('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  await Aa.destroy({ where: { id } })

  res.status(204)
  res.send()
})

router.put('/:id', auth, async function (req, res, next) {
  const { id } = req.params
  const aa = await Aa.findOne({ where: { id } })

  aa.a = req.body.a

  aa.save()

  res.send(aa)
})

module.exports = router
