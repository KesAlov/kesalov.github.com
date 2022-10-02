$('#comments-container').comments({

  postComment: function(commentJSON, success, error) {

    // Create form data and append all other fields but attachments

    var formData = new FormData();

    $(Object.keys(commentJSON)).each(function(index, key) {

      if(key != 'attachments') {

        var value = commentJSON[key];

        if(value) formData.append(key, value);

      }

    });

    // Append attachments to be created to the form data

    var attachmentsToBeCreated = commentJSON.attachments.filter(function(attachment){

      return !attachment.id

    });

    $(attachmentsToBeCreated).each(function(index, attachment) {

      formData.append('attachments_to_be_created', attachment.file);

    });

    // Save the comment together with the attachments

    $.ajax({

      type: 'post',

      url: '/api/comments/',

      data: formData,

      contentType: 'multipart/form-data',

      success: function(comment) {

        success(comment);

      },

      error: error

    });

  }

});
