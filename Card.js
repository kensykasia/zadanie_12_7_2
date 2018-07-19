// KLASA KANBAN CARD
function Card(id, name, columnId) {
    var self = this;

    this.id = id;
    this.name = name || 'No name given';
    this.columnId = columnId;
    this.element = createCard();

    function createCard() {
        var card = $('<li class="card"></li>');
        var cardDeleteBtn = $('<button class="btn-delete">x</button>');
        var cardDescription = $('<p class="card-description"></p>');
        var cardEditBtn = $('<button class="btn-edit">Edit</button>');

        cardDeleteBtn.click(function() {
            self.removeCard();
        });

        cardEditBtn.click(function() {
            self.changeName();
        });

        card.append(cardEditBtn);
        card.append(cardDeleteBtn);
        cardDescription.text(self.name);
        card.append(cardDescription)
        return card;
    }
}
Card.prototype = {
    removeCard: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function() {
                self.element.remove();
            }
        });
    },
    changeName: function() {
        var self = this;
        var newName = prompt("Enter new name of the card");
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'PUT',
            data: {
                name: newName,
                bootcamp_kanban_column_id: self.columnId
            },
            success: function(response) {
                self.element.find('.card-description').text(newName);
            }
        });
    }
}
