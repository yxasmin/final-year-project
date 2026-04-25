from django.db import models
from django.contrib.auth.models import User

class ChallengeProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='challenge_progress')
    challenge_id = models.CharField(max_length=100)
    task_index = models.IntegerField() #sub-task
    completed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        #prevent duplicate task completion per challenge
        unique_together = ('user', 'challenge_id', 'task_index')
    
    def __str__(self):
        return f"{self.user.username} - {self.challenge_id} - task {self.task_index}"

class Favourite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="favourites")
    product_id = models.IntegerField()
    
    class Meta: 
        unique_together = ("user", "product_id")

    def __str__(self):
        return f"{self.user.username} - product {self.product_id}"