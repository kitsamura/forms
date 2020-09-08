$(document).ready(function () {


    $('input[name="sale[lastname]"], input[name="sale[name]"], input[name="sale[surname]"]').on('blur', function () {
        $(this).val($(this).val().replace(/[^А-Яа-я\-\s]/g, ''))
    });

    $(document).on('keyup', '.input__email', function () {
        let email = $(this).val();
        if (email.length > 0 &&
            (email.match(/[-0-9A-Za-z\.]+?\@[a-z]+\.[a-z]/) || []).length !== 1) {
            $(this).css("box-shadow", "0 0 2px 0 #ed1d25");
        } else {
            $(this).css("box-shadow", "none");
        }
    });


    $('.option_standart').show();


    function initToken() {
        $("#buy_form").each(function (element) {
            let rate_id = $('#sale_id').val();
            $.post('ExternalSale.php?a=init&rate_id=' + rate_id + '', function (data) {
                let d = JSON.parse(data);
                $('#sale_key').val(d.token);
            })

        })
    };

    let tariffs = {
        standart: {
            id: '2492',
        },
        light: {
            id: '2487',
        },

    };


    $('#selector').change(() => {
        var tarifftype = $('#selector option:selected').val();
        $('#sale_id').val(tariffs[tarifftype].id);
        initToken();
    });

    $(document).on('keyup', '#email', function () {
        let email = $(this).val();
        if (email.length > 0 &&
            (email.match(/[-0-9A-Za-z\.]+?\@[a-z]+\.[a-z]/) || []).length !== 1) {
            $(this).css("box-shadow", "0 0 2px 0 #ed1d25");
        } else {
            $(this).css("box-shadow", "none");
        }
    });



    $('#accept').click(function () {

        if (($('[name="sale[lastname]"]').val().length > 0) &&
        ($('[name="sale[mobile]"]').val().length > 1) && ($('[name="sale[surname]"]').val().length > 0) && 
        ($('[name="sale[email]"]').val().length > 0) &&
       ($('.checkbox').is(':checked')) && ($('#selector option:selected').val().length > 1))
            {
            $('form').submit();
        } else {
            if (!$('.checkbox').is(':checked')) {
                $('.checkbox-custom').css('border-color', 'rgb(237, 29, 37)')
            } else {
                $('.checkbox-custom').css('border-color', '#adadad')
            }
            $('form .required').each(function () {
                if ($(this).val().length > 0) {
                    $(this).css('border', '1px solid #adadad')
                } else {
                    $(this).css('border', '1px solid rgb(237, 29, 37)')
                }
            })
        }

    })

    $('#buy_form').change(function () {

        if (($('[name="sale[lastname]"]').val().length > 0) &&
         ($('[name="sale[mobile]"]').val().length > 1) && ($('[name="sale[surname]"]').val().length > 0) && 
         ($('[name="sale[email]"]').val().length > 0) &&
        ($('.checkbox').is(':checked')) && ($('#selector option:selected').val().length > 1))
        {
            
            $('.button_buy').css('opacity', '1');
            }
        else {
            $('.button_buy').css('opacity', '0.5');
        }
    });

    $("#phone").mask("+7 (999) 999-9999");


});