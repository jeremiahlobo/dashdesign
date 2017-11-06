// app.js

var PF = PF || {};


PF.ui = {};

PF.ui.map = {
    unfurl: function () {
        if ( $( '#map' ).hasClass( 'unfurled' ) ) {
            $( '.unfurled' ).removeClass( 'unfurled' );
            $( '.active' ).removeClass( 'active' );
            $( '.icon-roll__down' ).addClass( 'active' );
        } else {
            $( '#map' ).addClass( 'unfurled' );
            $( '.active' ).removeClass( 'active' );
            $( '.icon-roll__up' ).addClass( 'active' );
        }
    }
};

PF.ui.panels = {
    panels: document.getElementsByClassName('panel'),
    panelsLocation: [],
    panelsWidth: [],

    currentState: function () {
        var resetFlag = false;

        this.panelsLocation = [];
        this.panelsWidth = [];

        for (var i = 0; i < this.panels.length; i++) {

            var transformMatrix = window
                .getComputedStyle(this.panels[i])
                .getPropertyValue('transform');

            var widthMatrix = window
                .getComputedStyle(this.panels[i])
                .getPropertyValue('width');

            var currentLocationX = Number(
                transformMatrix
                    .split('(')[1]
                    .split(')')[0]
                    .split(', ')[4]
            );

            var currentWidthX = Number(
                widthMatrix
                    .match(/(\d+)/g)
            );

            // test if the panels are the same width as their location
            if (Math.abs(currentLocationX % currentWidthX) !== 0) {
                resetFlag = true;
            }

            this.panelsLocation.push(currentLocationX);
            this.panelsWidth.push(currentWidthX);

        }

        if (resetFlag) {

            var currentIndex;

            if (this.panelsLocation.indexOf(0) < 0) {
                var arr = [];
                var setZero;

                for (i = 0; i < this.panelsLocation.length; i++) {
                    arr.push(Math.abs(this.panelsLocation[i]));
                }

                setZero = arr.indexOf(
                    Math.min.apply(Math, arr)
                );

                currentIndex = setZero;
            } else {
                currentIndex = this.panelsLocation.indexOf(0);
            }

            for (i = 0; i < this.panelsLocation.length; i++) {
                var val = i - currentIndex;
                var newPosition = val * this.panelsWidth[i];
                var transformCommand = "translate3d(" + newPosition + "px, 0, 0)";

                this.panels[i].style.transform = transformCommand;
            }

        }
    },

    dig: function () {
        this.currentState();

        if (this.panelsLocation[this.panelsLocation.length - 1] >= this.panelsWidth[this.panelsWidth.length - 1]) {
            for (var i = 0; i < this.panels.length; i++) {
                var newPosition = this.panelsLocation[i] - this.panelsWidth[i];

                var transformCommand = "translate3d(" + newPosition + "px, 0, 0)";

                this.panels[i].style.transform = transformCommand;
            }
        }
    },

    climb: function () {
        this.currentState();

        if (this.panelsLocation[0] <= (-1 * this.panelsWidth[0]) ) {
            for (var i = 0; i < this.panels.length; i++) {
                var newPosition = this.panelsLocation[i] + this.panelsWidth[i];

                var transformCommand = "translate3d(" + newPosition + "px, 0, 0)";

                this.panels[i].style.transform = transformCommand;
            }
        }
    }
};


PF.ui.tabs = {
    toggleTabs: function () {
        if ( $( this ).attr( 'aria-selected' ) === 'true' ) {
            $( '[aria-selected="true"]' ).attr( 'aria-selected', 'false' );
            $.each( $('[aria-selected="false"]'), function () {
                var panelId = $( this ).attr( 'aria-controls' );
                $( '[id=' + panelId + ']' )
                    .attr( 'aria-hidden', 'true' )
                    .slideUp(200);
            });

        } else {
            $( '[aria-selected="true"]' ).attr( 'aria-selected', 'false' );
            $( this ).attr( 'aria-selected', 'true' );
            $.each( $('[aria-selected="false"]'), function () {
                var panelId = $( this ).attr( 'aria-controls' );
                $( '[id=' + panelId + ']' )
                    .attr( 'aria-hidden', 'true' )
                    .slideUp(200);
            });

            var panelId = $( this ).attr( 'aria-controls' );
            $( '[id=' + panelId + ']' )
                .attr( 'aria-hidden', 'false' )
                .slideDown(200);
        }
    }
};