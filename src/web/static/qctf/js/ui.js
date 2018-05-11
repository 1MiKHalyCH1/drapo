function showModal(task_id) {
    $('.modal-task[data-id="' + task_id + '"]').css('display', 'flex');
}

function hideModal() {
    $('.modal-task').css('display', 'none');
    $('.modal-task .alert').hide();
}

function update_unread_notifications_count() {
    return $.get("/api/unread_notifications_count/", function(data) {
        if (data['unread_count'])
            t = '(' + data['unread_count'] + ')';
        else
            t = '';
        $(".unread-count").html(t);
    });
}

function markAsSolved(task_id) {
    $(".list-"+task_id+"-list")
        .addClass('solved');
}

function submitFlag(button, task_id, answer_input) {
    var answer = answer_input.val();
    answer_input
        .val('')
        .attr("disabled", "disabled")
        .attr("placeholder", 'Проверка...');
    button
        .prop("disabled", true);    

    $.post("/api/submit_flag/" + task_id + "/", {'answer':answer})
        .done(function (response) {
            if (response.status === 'success') {
                markAsSolved(task_id);
                answer_input
                    .attr("placeholder", 'Верно!');
            } else {
                answer_input
                    .removeAttr("disabled")
                    .attr("placeholder", 'Не верно!');
                button
                    .prop("disabled", true); 
            }
        })
        .fail(function () {
            answer_input
                    .removeAttr("disabled")
                    .attr("placeholder", 'Не удалось подключиться к серверу. Попробуйте ещё раз через некоторое время.');
            button
                .prop("disabled", false);                    
        });
}

function padLeft(number, length) {
    number = number.toString();
    for (var i = number.length; i < length; i++)
        number = '0' + number;
    return number;
}

function updateRemainingTime() {
    var finishTime = parseInt($('#contest-finish-time').text());
    var now = Math.round(new Date().getTime() / 1000);
    var remainingTimeSpan = $('#remaining-time');

    if (finishTime <= now) {
        remainingTimeSpan.text('Соревнование закончено');
        return;
    }
    var totalSeconds = finishTime - now;

    var seconds = totalSeconds % 60;
    var totalMinutes = Math.floor(totalSeconds / 60);
    var minutes = totalMinutes % 60;
    var hours = Math.floor(totalMinutes / 60);

    var timeRepr = padLeft(hours, 2) + ':' + padLeft(minutes, 2) + ':' + padLeft(seconds, 2);
    remainingTimeSpan.text('Осталось: ' + timeRepr);
}

function toggleHideOtherRegions() {
    $('tbody tr:not(.my-region)').toggle();
    $('tbody tr:visible').each(function (i, el) {
        if (i % 2 === 0)
            $(el).removeClass('odd').addClass('even');
        else
            $(el).removeClass('even').addClass('odd');
    });

    localStorage['hide-other-regions'] = $('#hide-other-regions').is(':checked');
}

$(function () {
    $('.article, .article-with-image').each(function (_, article) {
        var task_id = $(article).data('id');
        $(article).find('a').click(function (event) {
            showModal(task_id);
            event.preventDefault();
        });
    });
    $('.task-prices th').click(function () {
        var task_id = $(this).data('id');
        showModal(task_id);
    });

    $('.modal').click(function (e) {
        if ($(e.target).is('.modal'))
            hideModal();
    });
    $('button.close').click(hideModal);
    
    update_unread_notifications_count();
    setInterval(update_unread_notifications_count, 3*60*1000);

    var toggle = $('#hide-other-regions');
    if (localStorage['hide-other-regions'] === "true") {
        toggle.attr('checked', true);
        toggleHideOtherRegions();
    }
    toggle.change(toggleHideOtherRegions);

    $('.task-description').each(function (_, el) {
        var task_id = $(this).attr('id');
        var div = $(el).find('.submit-flag-div');
        var answer_input = div.find('input[name=answer]');
        var button = div.find('button');
        button.click(function (event) {
            submitFlag(button, task_id, answer_input);
            event.preventDefault();
        });
    });

    updateRemainingTime();
    setInterval(updateRemainingTime, 1000);
});

function notifications(){
    $.post('/api/notifications/')
    .done(function (resp) {
        var ul = $('<ul/>')
            .addClass('ul_journal');
        $.each(resp.notifications, function(i, v) {
            var li = $('<li/>')
                .addClass(i === 0 ? "list-group-item text-white": "list-group-item text-muted")
                .append($('<h4/>')
                    .text(v.title)
                )
                .append($('<p/>')
                    .addClass("text-muted")
                    .text(v.publish_time)
                )
                .append($('<p/>')
                    .text(v.text)
                );
            
            ul.append(li);
        });
        $("ul.ul_journal").replaceWith(ul);
    });
}

function scoreboard(){
    $.post('/api/scoreboard/')
    .done(function (resp) {
        var tbody = $('<tbody/>')
            .addClass('scoreboard-table text-small');
        var prev_tbody = $('tbody.scoreboard-table');
        tbody
            .append($("tr.scoreboard-teams"));
        $.each(resp.scoreboard, function(i, team) {
            var tr = $('<tr/>');
            tr.append($('<th/>')
                .attr('scope','raw')
                .text(team.team_name)
            );
            $.each(team.team_solves, function(i, task) {
                if (task) {
                    tr
                        .append($('<td/>')
                            .addClass('text-center green')
                            .text('●')
                        );
                }
                else {
                    tr
                        .append($('<td/>')
                            .addClass('text-center')
                    );
                }
            });
            tr
                .append($('<td/>')
                    .addClass('text-right')
                    .text(team.total_scores)
                );
            tbody
                .append(tr)
        });
        prev_tbody.replaceWith(tbody);
    });
}