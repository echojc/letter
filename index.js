$(document).ready(function(){
  var options = {};
  options['intro'] = [
    'Just wanted to let you know that',
    'Just wanted to say that',
    'You might not know this, but',
    'As much as I hate to admit it,',
  ];
  options['true'] = [
    'you’re someone who means a lot to me',
    'I’m so glad to have you as a friend',
    'I always have so much fun hanging out with you',
    'you’re a pretty cool person to be around',
    'you’re always encouraging me to be the best I can be',
    'you’re always supporting me through the hard times',
    'you’re an inspiration to be around',
    'sometimes I feel like I don’t know what I’d do without you there',
    'you always motivate me to try new things',
  ];
  options['thing'] = [
    'you’re a good friend',
    'you’re funny',
    'you always support me when I don’t know what to do',
    'you’re kinda cool',
    'you’re pretty chill',
    'you’re fun to hang out with',
    'you always bring a smile to my face',
    'you always make me smile',
  ];
  options['thing1'] = [
    'You’re a good friend',
    'You’re funny',
    'You always support me when I don’t know what to do',
    'You’re kinda cool',
    'You’re pretty chill',
    'You’re fun to hang out with',
    'You always bring a smile to my face',
    'You always make me smile',
  ];
  options['encouragement'] = [
    'Keep being amazing',
    'Keep being awesome',
    'Keep being an inspiration',
    'Stay cool',
    'Never stop being a badass',
  ];
  options['wishes'] = [
    'hope you have a great Christmas and New Year’s',
    'have a great summer holiday',
    'enjoy your trip overseas',
  ];

  $('.choose').each(function(){
    var text = $(this).text().trim();
    var name = $(this).data('name');
    var heading = $(this).data('heading');

    if (options[name]) {
      $(this).html('');

      var optionsStr = '';
      for (var i = 0; i < options[name].length; i++) {
        optionsStr += '<span class="list-group-item">' + options[name][i] + '</span>';
      }

      $(this).addClass('choose-valid');

      $(this).append(
        '<span class="edit edit-hidden">' +
          (heading ? '<small>' + heading + '</small>' : '') +
          '<span class="form-row">' +
            '<span class="col-10"><input class="form-control edit-input" type="text"/></span>' +
            '<span class="col-2"><button type="button" class="btn btn-link edit-button">&gt;</button></span>' +
          '</span>'+
          '<small>or choose a suggestion</small>' +
          '<span class="list-group list-group-flush">' + optionsStr + '</span>' +
        '</span>' +
        '<span class="text">' + text + '</span>'
      );

      $(this).on('click', function(){
        if ($(this).hasClass('choose-valid')) {
          var textEl = $(this).find('.text');
          $(this).removeClass('choose-valid edit-finish-init edit-finish').addClass('editing');
          $(this).find('.edit').slideDown();
          textEl.hide();
          $(this).find('input').val(textEl.text().trim()).select();
        }
      });
    }
  });

  function handleDone(input) {
    var edit = $(input).closest('.editing');
    var textEl = $(edit).find('.text');
    console.log($(input).val());
    textEl.text($(input).val());
    textEl.show();
    $(edit).find('.edit').slideUp();
    $(edit).removeClass('editing').addClass('choose-valid');
    setTimeout(function(){
      $(edit).addClass('edit-finish-init');
      setTimeout(function(){ $(edit).addClass('edit-finish'); }, 0);
    }, 0);
  }
  $('.edit-button').on('click', function(e){ handleDone($(this).closest('.edit').find('input')); e.stopPropagation(); });
  $('.edit-input').on('keyup', function(e){ if (e.key === 'Enter') { handleDone($(this)); } });

  $('.list-group-item').on('click', function(e){
    var inputEl = $(this).closest('.editing').find('input');
    inputEl.val($(this).text().trim());
    handleDone(inputEl);
    e.stopPropagation();
  });
});
