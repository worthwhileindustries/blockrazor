import { Template } from 'meteor/templating';
import './approveCommunityImage.html'
import swal from 'sweetalert'

Template.approveCommunityImage.helpers({
        getThumbnailImage: function(img) {
            return thumbnail_filename = _communityUploadDirectoryPublic + img.split('.')[0] + '_thumbnail.' + img.split('.')[1];
        }
});

Template.approveCommunityImage.events({
   'click .image': function(event) {

          //open modal
          $('.imageModal').modal('show');

          //get large image filename
          let largeImage = event.target.src.replace('_thumbnail', '');
          $(".imageModalSrc").attr("src", largeImage);

      },
  'click #reject': function(event) {

      swal("Why are you rejecting this?", {
        type: "warning",
              content: "input",
              button: { className: 'btn btn-primary' },
              showCancelButton: true,
              attributes: {
                  type: "text",
                  required: true,
              }
          })
          .then((rejectionReason) => {

              if (rejectionReason) {
                  Meteor.call('flagCommunityImage', this._id, rejectionReason, (err, data) => {
                      if (!err) {
                          sAlert.success('Rejected.')
                      } else {
                          sAlert.error(err.reason)
                      }
                  })
              }else{
                sAlert.error('No rejection reason supplied, image not rejected')
              }
          });
  },
  'click #approve': function(event) {
    Meteor.call('approveCommunityImage', this._id, (err, data) => {
      if (!err) {
        sAlert.success('Approved.')
      } else {
        sAlert.error(err.reason)
      }
    })
  }
})

Template.approveCommunityImage.helpers({
  display: function() {
    return !this.approved ? 'flex' : 'none' 
  }
})
