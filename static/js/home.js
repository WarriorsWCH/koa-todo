;
(function() {
    'use strict';

    var $add_task = $('.task-input'),
        $task_list = [],
        $navs = $('.nav'),
        navStatus = 'all',
        $no_task = $('.no-task-tip'),
        $msg_con = $('.msg-container'),
        $task_detail = $('.task-detail'),
        info = {};

    init();
    // 初始化 读取store中的数据
    function init() {
        listen_nav_event();
        info = JSON.parse(window.sessionStorage.getItem('user'));
        $.ajax({
            type: "GET",
            url: "/api/list/getall.json",
            data: {
                uid: info.id
            },
            success: function(data) {
                console.log(data)
                if (data.success) {
                    $task_list = data.data;
                    is_rander();
                }
            },
            error: function() { //请求失败
                console.log('请求失败');
                $task_list = []
            },
        });

    }
    // 添加任务 input注册事件 keyup
    $add_task.keyup(function(e) {
        // 禁用默认行为
        e.preventDefault();
        // 按回车的时候触发
        if (e.keyCode === 13) {
            // 输入的内容不为空
            if (e.target.value.length) {
                $.ajax({
                    type: "POST",
                    url: "/api/list/add.json",
                    data: {
                        title: $(this).val(),
                        uid: info.id,
                        create_time: '2018-12-26'
                    },
                    success: function(data) {
                        console.log(data)
                        if (data.success) {
                            $task_list = data.data;
                            is_rander();
                        }
                    },
                    error: function() { //请求失败
                        console.log('请求失败');
                    },
                });
                // 当前inout清空
                $(this).val(null);
            } else { // 输入内容为空提示

            }
        }
    });

    function is_rander() {
        if ($task_list.length)
            render_task_list();
        else
            $no_task.show();
    }
    /*
     * 渲染所有Task模板
     * */
    function render_task_list() {
        $no_task.hide();
        var $todo_list = $('.todo-list');
        $todo_list.html('');
        var complete_items = []; // 已完成
        var unComplete_items = []; // 未完成
        $task_list.forEach(function(item, index) {
            if (item.is_completed)
                complete_items[index] = item;
            else
                unComplete_items[index] = item;
        })
        var data = $task_list;
        if (navStatus === 'all') {
            data = $task_list;
        } else if (navStatus === 'completed') {
            data = complete_items;
        } else if (navStatus === 'unCompleted') {
            data = unComplete_items;
        }
        for (var j = 0; j < data.length; j++) {
            var $task = render_task_item(data[j], j);
            if (!$task) continue;
            $todo_list.append($task);
        }
        listen_checkbox_complete($task_list);
        listen_task_delete($task_list);
        listen_task_detail($task_list);
    }
    /*
     *渲染单条Task模板
     * */
    function render_task_item(data, index) {
        if (!data) return;
        var list_item_tpl =
            `<li class="todo ${data.is_completed ? 'completed' : ''}">
                <input type="checkbox" class="toggle" data-index=${index} ${data.is_completed ? 'checked' : ''}>
                <label>${data.title}</label>
                <span class="fr">
                    <span class="action delete"> 删除</span>
                    <span class="action detail"> 详细</span>
                </span>
            </li>`;
        return $(list_item_tpl);
    }
    // checkbox Task完成切换
    function listen_checkbox_complete(data) {
        $('.toggle').click(function() {
            $task_list[$(this).data('index')].is_completed = !$task_list[$(this).data('index')].is_completed;
            $(this).parent().toggleClass("completed");
            $.ajax({
                type: "POST",
                url: "/api/list/update.json",
                data: $task_list[$(this).data('index')],
                success: function(data) {
                    console.log(data)
                    if (data.success) {
                        $task_list = data.data;
                        is_rander();
                    }
                },
                error: function() { //请求失败
                    console.log('请求失败');
                },
            });
        });
    }
    // 删除Task
    function listen_task_delete(data) {
        $('.delete').click(function() {
            var index = $(this).parent().siblings('.toggle').data('index');
            $msg_con.fadeIn();
            // 确认删除
            pop().then(function(f) {
                if (f) {
                    $.ajax({
                        type: "POST",
                        url: "/api/list/delete.json",
                        data: data[index],
                        success: function(data) {
                            console.log(data)
                            if (data.success) {
                                $task_list = data.data;
                                is_rander();
                            }
                        },
                        error: function() { //请求失败
                            console.log('请求失败');
                        },
                    });
                }
            })
        });
    }
    // 导航切换
    function listen_nav_event() {
        $navs.click(function() {
            $navs.removeClass('active');
            if ($(this).hasClass('all')) {
                navStatus = 'all';
            } else if ($(this).hasClass('complete')) {
                navStatus = 'completed';
            } else if ($(this).hasClass('unCompleted')) {
                navStatus = 'unCompleted';
            }
            $(this).addClass('active');
            render_task_list();
        });
    }
    // 弹窗提示
    function pop() {
        var timer, dfd = $.Deferred(),
            confirmed;
        $('.confirm').on('click', on_confirmed)
        $('.cancel').on('click', on_cancel);
        $('.close').on('click', on_cancel);
        $('.update').on('click', on_confirmed)

        function on_cancel() {
            confirmed = false;
        }

        function on_confirmed(e) {
            e.stopPropagation();
            confirmed = true;
        }
        timer = setInterval(function() {
            if (confirmed !== undefined) {
                dfd.resolve(confirmed);
                clearInterval(timer);
                $('.mask').fadeOut();
            }
        }, 50)
        return dfd.promise();
    }
    var $content = $('[name=content]'),
        $desc = $('[name=desc]'),
        $remind_date = $('[name=remind_date]');
    // 更新 detail
    function listen_task_detail(data) {
        $('.detail').click(function() {
            var index = $(this).parent().siblings('.toggle').data('index');
            $task_detail.fadeIn();
            $content.val(data[index].title);
            $desc.val(data[index].des);
            $remind_date.val(data[index].remind_time);

            pop().then(function(f) {
                if (f) {
                    data[index].title = $content.val();
                    data[index].des = $desc.val();
                    data[index].remind_time = $remind_date.val();
                    console.log(data[index], 's')
                    $.ajax({
                        type: "POST",
                        url: "/api/list/update.json",
                        data: data[index],
                        success: function(data) {
                            console.log(data)
                            if (data.success) {
                                $task_list = data.data;
                                is_rander();
                            }
                        },
                        error: function() { //请求失败
                            console.log('请求失败');
                        },
                    });
                }
            })
        })
    }
    // 日历
    $('.datetime').datetimepicker();
})();