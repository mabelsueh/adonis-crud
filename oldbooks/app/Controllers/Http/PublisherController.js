'use strict'

// same as require in express
const Publisher = use (App/Models/Publisher)

class PublisherController {
  // it is async as data is being fetched from elsewhere, if no async
  // the page may load before data is successfully fetched

  // index is the name of the function you are linking in the route
  // view is the required HTTP Context, which is a class instance
  async index({view}) {
    let allPublishers = await Publisher.all()
    console
    // renders views/publishers/index.edge file
    return view.render('publishers/index',{
      // 'publishers' used to represent all the data in the publishers db
      // 'publishers': linked to index.edge, where
      // @each(foreach) (publisher in publishers) = renders each entry
      // need .toJSON() because without it you will get error, and in console
      // it returns a chunk of data that is not what we want
      // to try it out u can console.log(allPublishers) & (allPublishers.toJSON())
      // & refresh browser, then see what is returned in console
      'publishers': allPublishers.toJSON()
    })
  }

  show ({params}) {
    return params.publisher_id

  }
  create({view}) {
    return view.render('publishers/create')
  }

  async processCreate({request,response}) {
    let formData = request.post()
    let newPublisher = new Publisher()
    newPublisher.name = formData.name;
    newPublisher.email = formData.email;
    // step 3: save
    await newPublisher.save();
    response.route('show_all_publishers')
  }

  async update({view,params}) {
    let publisher = await Publisher.find(params.publisher_id)
    return view.render('publishers/update', {
      publisher: publisher.toJSON()
    })
  }
}

module.exports = PublisherController
